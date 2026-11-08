function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export async function onRequest(context) {
  const { request, env, params } = context;
  const slug = params.slug;

  // 1. Fetch product from Supabase
  const apiUrl = new URL(`${env.SUPABASE_URL}/rest/v1/products`);

  apiUrl.searchParams.set("slug", `eq.${slug}`);
  apiUrl.searchParams.set("select", "title,slug,description,images:product_images(url,index)");
  apiUrl.searchParams.set("product_images.order", "index.asc");
  apiUrl.searchParams.set("limit", "1");

  const productResponse = await fetch(apiUrl, {
    headers: {
      apikey: env.SUPABASE_ANON_KEY,
      Authorization: `Bearer ${env.SUPABASE_ANON_KEY}`,
    },
  });

  if (!productResponse.ok) {
    return new Response("Failed to load product", {
      status: 502,
    });
  }

  const products = await productResponse.json();
  const product = products[0];

  if (!product) {
    return new Response("Product not found", {
      status: 404,
    });
  }

  // 2. Get Angular index.html from Cloudflare Pages
  const assetUrl = new URL("/", request.url);

  const htmlResponse = await env.ASSETS.fetch(new Request(assetUrl));

  if (!htmlResponse.ok) {
    return htmlResponse;
  }

  // 3. Build metadata
  const title = `${product.title} | Glicks Woodworking`;
  const description =
    product.description ||
    "Explore handcrafted products from Glicks Woodworking.";

  const image = new URL(
    product.images?.[0]?.url || "/logo-mark.png",
    request.url,
  ).href;
  const canonicalUrl = new URL(
    `/product/${encodeURIComponent(product.slug)}`,
    request.url,
  ).href;

  // 4. Inject metadata into HTML
  const html = new HTMLRewriter()
    .on("title", {
      element(element) {
        element.setInnerContent(title);
      },
    })
    .on("head", {
      element(element) {
        const tags = `
          <meta name="description"
                content="${escapeHtml(description)}">

          <meta property="og:title"
                content="${escapeHtml(title)}">

          <meta property="og:description"
                content="${escapeHtml(description)}">

          <meta property="og:image"
                content="${escapeHtml(image)}">

          <meta property="og:url"
                content="${escapeHtml(canonicalUrl)}">

          <meta property="og:type"
                content="product">

          <meta name="twitter:card"
                content="summary_large_image">

          <meta name="twitter:title"
                content="${escapeHtml(title)}">

          <meta name="twitter:description"
                content="${escapeHtml(description)}">

          <meta name="twitter:image"
                content="${escapeHtml(image)}">
        `;

        element.append(tags, { html: true });
      },
    })
    .transform(htmlResponse);

  // 5. Avoid caching wrong product metadata
  const headers = new Headers(html.headers);
  headers.set("Cache-Control", "public, max-age=0, must-revalidate");

  return new Response(html.body, {
    status: html.status,
    headers,
  });
}
