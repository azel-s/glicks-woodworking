import type { SupabaseClient } from "@supabase/supabase-js";

import {
  type CloudinaryAsset,
  cloudinaryAssetFromUrl,
  deleteCloudinaryAssets,
} from "./cloudinary.ts";
import { isRecord, jsonResponse } from "./http.ts";
import {
  type ExistingImage,
  type NewImage,
  parseProductDetails,
  parseUpdateImages,
  type UpdatedProduct,
  type UpdateImage,
} from "./product-validation.ts";

export async function handleUpdateProduct(
  supabase: SupabaseClient,
  body: Record<string, unknown>,
): Promise<Response> {
  const details = parseProductDetails(body["product"]);
  const productValue = body["product"];
  const images = parseUpdateImages(body["images"]);
  if (!details) {
    return jsonResponse(
      { error: "Product title, slug, description, or price is invalid." },
      400,
    );
  }
  if (
    !isRecord(productValue) ||
    typeof productValue["id"] !== "string" ||
    typeof productValue["sold"] !== "boolean"
  ) {
    return jsonResponse(
      { error: "Product ID or sold status is invalid." },
      400,
    );
  }
  if (!images) {
    return jsonResponse(
      { error: "Product images are invalid. Keep between 1 and 10 images." },
      400,
    );
  }

  const product: UpdatedProduct = {
    ...details,
    id: productValue["id"],
    sold: productValue["sold"],
  };
  const existingIds = images
    .filter((image): image is ExistingImage => "id" in image)
    .map((image) => image.id);
  if (new Set(existingIds).size !== existingIds.length) {
    return jsonResponse({ error: "Invalid product images." }, 400);
  }

  const { data: existingProduct, error: productLookupError } = await supabase
    .from("products")
    .select("id")
    .eq("id", product.id)
    .maybeSingle();
  if (productLookupError) {
    console.error("Unable to find product for update:", productLookupError);
    return jsonResponse({ error: "The product could not be updated." }, 500);
  }
  if (!existingProduct) {
    return jsonResponse({ error: "Product not found." }, 404);
  }

  const { data: existingImages, error: imagesLookupError } = await supabase
    .from("product_images")
    .select("id, url, index")
    .eq("product_id", product.id);
  if (imagesLookupError) {
    console.error(
      "Unable to find product images for update:",
      imagesLookupError,
    );
    return jsonResponse({ error: "The product could not be updated." }, 500);
  }

  const existingImageIds = new Set(
    (existingImages ?? []).map((image) => image.id),
  );
  if (existingIds.some((id) => !existingImageIds.has(id))) {
    return jsonResponse({ error: "Invalid product images." }, 400);
  }

  const newAssets = images.filter((image): image is NewImage =>
    !("id" in image)
  );
  let newAssetsInserted = false;
  try {
    const { error: productUpdateError } = await supabase
      .from("products")
      .update({
        title: product.title,
        slug: product.slug,
        description: product.description,
        price: product.price,
        sold: product.sold,
      })
      .eq("id", product.id);
    if (productUpdateError) {
      if (productUpdateError.code === "23505") {
        throw new Error("A product with this web slug already exists.");
      }
      console.error("Unable to update product:", productUpdateError);
      throw new Error("Product details could not be saved.");
    }

    await updateExistingImages(
      supabase,
      product.id,
      images,
      existingImages ?? [],
    );
    newAssetsInserted = await insertNewImages(supabase, product.id, images);

    const removedIds = [...existingImageIds].filter((id) =>
      !existingIds.includes(id)
    );
    await removeImages(supabase, product.id, removedIds);
    const newAssetIds = new Set(newAssets.map((asset) => asset.public_id));
    const removedAssets = (existingImages ?? [])
      .filter((image) => removedIds.includes(image.id))
      .map((image) => cloudinaryAssetFromUrl(image.url))
      .filter(
        (asset): asset is CloudinaryAsset =>
          asset !== null && !newAssetIds.has(asset.public_id),
      );
    await deleteCloudinaryAssets(removedAssets);
    return jsonResponse({ ok: true });
  } catch (error) {
    if (!newAssetsInserted) {
      const existingAssetIds = new Set(
        (existingImages ?? [])
          .map((image) => cloudinaryAssetFromUrl(image.url)?.public_id)
          .filter((publicId): publicId is string => publicId !== undefined),
      );
      await deleteCloudinaryAssets(
        newAssets.filter((asset) => !existingAssetIds.has(asset.public_id)),
      );
    }
    const message = error instanceof Error
      ? error.message
      : "Product update failed.";
    return jsonResponse({ error: message }, 400);
  }
}

async function updateExistingImages(
  supabase: SupabaseClient,
  productId: string,
  images: UpdateImage[],
  existingImages: { id: string; index: number }[],
): Promise<void> {
  if (!existingImages.length) {
    return;
  }

  const maxIndex = Math.max(...existingImages.map((image) => image.index));
  const temporaryIndexStart = maxIndex + existingImages.length + 1;
  for (const [offset, image] of existingImages.entries()) {
    const { error } = await supabase
      .from("product_images")
      .update({ index: temporaryIndexStart + offset })
      .eq("id", image.id)
      .eq("product_id", productId);
    if (error) {
      console.error("Unable to prepare product image ordering:", error);
      throw new Error("Product images could not be reordered.");
    }
  }

  for (const [index, image] of images.entries()) {
    if (!("id" in image)) {
      continue;
    }
    const { error } = await supabase
      .from("product_images")
      .update({ index, description: image.description })
      .eq("id", image.id)
      .eq("product_id", productId);
    if (error) {
      console.error("Unable to update product images:", error);
      throw new Error("Product images could not be reordered.");
    }
  }
}

async function insertNewImages(
  supabase: SupabaseClient,
  productId: string,
  images: UpdateImage[],
): Promise<boolean> {
  const rows = images.flatMap((image, index) =>
    "id" in image ? [] : [{
      product_id: productId,
      index,
      url: image.secure_url,
      description: image.description,
    }]
  );
  if (!rows.length) {
    return false;
  }

  const { error } = await supabase.from("product_images").insert(rows);
  if (error) {
    console.error("Unable to save new product images:", error);
    throw new Error("Product images could not be saved.");
  }
  return true;
}

async function removeImages(
  supabase: SupabaseClient,
  productId: string,
  ids: string[],
): Promise<void> {
  if (!ids.length) {
    return;
  }
  const { error } = await supabase
    .from("product_images")
    .delete()
    .eq("product_id", productId)
    .in("id", ids);
  if (error) {
    console.error("Unable to remove product images:", error);
    throw new Error("Removed product images could not be deleted.");
  }
}
