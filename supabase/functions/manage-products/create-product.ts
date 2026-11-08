import type { SupabaseClient } from "@supabase/supabase-js";

import { deleteCloudinaryAssets } from "./cloudinary.ts";
import { jsonResponse } from "./http.ts";
import {
  parseCreateImages,
  parseProductDetails,
} from "./product-validation.ts";

export async function handleCreateProduct(
  supabase: SupabaseClient,
  body: Record<string, unknown>,
): Promise<Response> {
  const product = parseProductDetails(body["product"]);
  const images = parseCreateImages(body["images"]);
  if (!product || !images) {
    return jsonResponse(
      { error: "Enter valid product details and at least one image." },
      400,
    );
  }

  try {
    const { data: savedProduct, error: productError } = await supabase
      .from("products")
      .insert({ ...product, sold: false })
      .select("id")
      .single();

    if (productError || !savedProduct) {
      if (productError?.code === "23505") {
        throw new Error("A product with this web slug already exists.");
      }
      console.error("Unable to save product:", productError);
      throw new Error("Product details could not be saved.");
    }

    const imageRows = images.map((image, index) => ({
      product_id: savedProduct.id,
      index,
      url: image.secure_url,
      description: image.description,
    }));
    const { error: imageError } = await supabase
      .from("product_images")
      .insert(imageRows);

    if (imageError) {
      console.error("Unable to save product images:", imageError);
      const { error: cleanupError } = await supabase
        .from("products")
        .delete()
        .eq("id", savedProduct.id);
      if (cleanupError) {
        console.error(
          "Unable to roll back product after image insert failure:",
          cleanupError,
        );
      }
      throw new Error("Product images could not be saved.");
    }

    return jsonResponse({ id: savedProduct.id, slug: product.slug });
  } catch (error) {
    await deleteCloudinaryAssets(images);
    const message = error instanceof Error
      ? error.message
      : "Product creation failed.";
    return jsonResponse({ error: message }, 400);
  }
}
