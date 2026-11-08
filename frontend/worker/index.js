const SITE_NAME = 'Glicks Woodworking';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Only process /product/:slug routes.
    const match = url.pathname.match(/^\/product\/([^/]+)\/?$/);

    // Let Cloudflare serve all other requests normally.
    if (!match) {
      return env.ASSETS.fetch(request);
    }

    let slug;

    try {
      slug = decodeURIComponent(match[1]);
    } catch {
      return env.ASSETS.fetch(request);
    }

    try {
      // 1. Look up the product by slug.
      const productUrl = new URL('/rest/v1/products', env.SUPABASE_URL);

      productUrl.searchParams.set('select', 'id,title,slug,description');
      productUrl.searchParams.set('slug', `eq.${slug}`);
      productUrl.searchParams.set('limit', '1');

      const productResponse = await fetch(productUrl, {
        headers: {
          apikey: env.SUPABASE_ANON_KEY,
          Authorization: `Bearer ${env.SUPABASE_ANON_KEY}`,
        },
      });

      if (!productResponse.ok) {
        throw new Error(`Product lookup failed: ${productResponse.status}`);
      }

      const products = await productResponse.json();
      const product = products[0];

      // If no product exists, let Angular handle its not-found route.
      if (!product) {
        return env.ASSETS.fetch(request);
      }

      // 2. Find the first product image by its display order.
      const imageUrl = new URL('/rest/v1/product_images', env.SUPABASE_URL);

      imageUrl.searchParams.set('select', 'url');
      imageUrl.searchParams.set('product_id', `eq.${product.id}`);
      imageUrl.searchParams.set('order', 'index.asc');
      imageUrl.searchParams.set('limit', '1');

      const imageResponse = await fetch(imageUrl, {
        headers: {
          apikey: env.SUPABASE_ANON_KEY,
          Authorization: `Bearer ${env.SUPABASE_ANON_KEY}`,
        },
      });

      if (!imageResponse.ok) {
        throw new Error(`Image lookup failed: ${imageResponse.status}`);
      }

      const images = await imageResponse.json();
      const image = images[0]?.url;

      // 3. Prepare metadata.
      const title = `${product.title} | ${SITE_NAME}`;

      const description = product.description || `View ${product.title} from ${SITE_NAME}.`;

      const canonicalUrl = url.origin + url.pathname;

      // Escape values before inserting them into HTML.
      const escapeHtml = (value) =>
        String(value).replace(
          /[&<>"']/g,
          (char) =>
            ({
              '&': '&amp;',
              '<': '&lt;',
              '>': '&gt;',
              '"': '&quot;',
              "'": '&#39;',
            })[char],
        );

      const safeTitle = escapeHtml(title);
      const safeDescription = escapeHtml(description);
      const safeUrl = escapeHtml(canonicalUrl);

      const absoluteImage = image ? new URL(image, url.origin).href : null;
      const safeImage = absoluteImage ? escapeHtml(absoluteImage) : null;

      // 4. Fetch Angular's actual index.html.
      const htmlResponse = await env.ASSETS.fetch(new Request(new URL('/', url.origin)));

      if (!htmlResponse.ok) {
        return htmlResponse;
      }

      // 5. Replace the page title and inject social metadata.
      const rewriter = new HTMLRewriter()
        .on('title', {
          element(element) {
            element.setInnerContent(title);
          },
        })
        .on("meta[property^='og:'], meta[name='description'], link[rel='canonical']", {
          element(element) {
            element.remove();
          },
        })
        .on('head', {
          element(element) {
            let tags = `
              <meta property="og:type" content="product">
              <meta property="og:title" content="${safeTitle}">
              <meta property="og:description" content="${safeDescription}">
              <meta property="og:url" content="${safeUrl}">
              <meta name="description" content="${safeDescription}">
              <link rel="canonical" href="${safeUrl}">
            `;

            if (safeImage) {
              tags += `
                <meta property="og:image" content="${safeImage}">
                <meta property="og:image:alt" content="${safeTitle}">
              `;
            }

            element.append(tags, { html: true });
          },
        });

      const response = rewriter.transform(htmlResponse);

      // Make sure the response is served as HTML.
      const headers = new Headers(response.headers);
      headers.set('Content-Type', 'text/html; charset=utf-8');

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    } catch (error) {
      // Metadata failures should not take down the actual website.
      console.error('Product metadata error:', error);

      return env.ASSETS.fetch(new Request(new URL('/', url.origin)));
    }
  },
};
