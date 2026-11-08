import type { SupabaseClient } from "@supabase/supabase-js";

import {
  type CloudinaryAsset,
  cloudinaryAssetFromUrl,
  deleteCloudinaryAssets,
  deleteCloudinaryProductFolder,
} from "./cloudinary.ts";
import { jsonResponse } from "./http.ts";

export async function handleDeleteProduct(
  supabase: SupabaseClient,
  body: Record<string, unknown>,
): Promise<Response> {
  const id = body["id"];
  if (typeof id !== "string") {
    return jsonResponse({ error: "Invalid product." }, 400);
  }

  const { data: product, error: productLookupError } = await supabase
    .from("products")
    .select("id, slug")
    .eq("id", id)
    .maybeSingle();
  if (productLookupError) {
    console.error("Unable to find product for deletion:", productLookupError);
    return jsonResponse({ error: "The product could not be deleted." }, 500);
  }
  if (!product) {
    return jsonResponse({ error: "Product not found." }, 404);
  }

  const { data: images, error: imagesLookupError } = await supabase
    .from("product_images")
    .select("id, url")
    .eq("product_id", id);
  if (imagesLookupError) {
    console.error(
      "Unable to find product images for deletion:",
      imagesLookupError,
    );
    return jsonResponse({ error: "The product could not be deleted." }, 500);
  }

  const { error: imagesDeleteError } = await supabase
    .from("product_images")
    .delete()
    .eq("product_id", id);
  if (imagesDeleteError) {
    console.error("Unable to delete product images:", imagesDeleteError);
    return jsonResponse({ error: "The product could not be deleted." }, 500);
  }

  const { error: productDeleteError } = await supabase
    .from("products")
    .delete()
    .eq("id", id);
  if (productDeleteError) {
    console.error("Unable to delete product:", productDeleteError);
    return jsonResponse(
      {
        error:
          "Product images were removed, but the product could not be deleted.",
      },
      500,
    );
  }

  const assets = (images ?? [])
    .map((image) => cloudinaryAssetFromUrl(image.url))
    .filter((asset): asset is CloudinaryAsset => asset !== null);
  if (assets.length !== (images ?? []).length) {
    console.error(
      "Product was deleted, but some image URLs could not be mapped to Cloudinary assets.",
      id,
    );
    return jsonResponse({
      error:
        "Product deleted, but some Cloudinary images could not be cleaned up.",
    }, 500);
  }
  if (!await deleteCloudinaryAssets(assets)) {
    return jsonResponse({
      error:
        "Product deleted, but some Cloudinary images could not be cleaned up.",
    }, 500);
  }
  if (!await deleteCloudinaryProductFolder(product.slug)) {
    return jsonResponse({
      error:
        "Product and images deleted, but the Cloudinary folder could not be removed.",
    }, 500);
  }
  return jsonResponse({ ok: true });
}
