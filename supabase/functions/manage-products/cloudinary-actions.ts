import {
  type CloudinaryAsset,
  createSignedUploads,
  deleteCloudinaryAssets,
  getCloudinaryCredentials,
  isCloudinaryAsset,
} from "./cloudinary.ts";
import { isRecord, jsonResponse } from "./http.ts";
import { maxImageCount } from "./product-validation.ts";
import type { SupabaseClient } from "@supabase/supabase-js";

export async function handleSignUpload(
  supabase: SupabaseClient,
  body: Record<string, unknown>,
): Promise<Response> {
  const count = body["count"];
  const slug = body["slug"];
  const indexes = body["indexes"];
  const productId = body["productId"];
  if (
    typeof slug !== "string" ||
    !/^[a-z0-9][a-z0-9_-]{0,199}$/i.test(slug)
  ) {
    return jsonResponse({
      error:
        "The slug must start with a letter or number and contain only letters, numbers, hyphens, or underscores.",
    }, 400);
  }
  if (
    (productId !== undefined && typeof productId !== "string") ||
    !Array.isArray(indexes) ||
    indexes.length !== count ||
    !indexes.every(
      (index) =>
        Number.isInteger(index) &&
        Number(index) >= 0 &&
        Number(index) < maxImageCount,
    ) ||
    new Set(indexes).size !== indexes.length ||
    !Number.isInteger(count) ||
    Number(count) < 1 ||
    Number(count) > maxImageCount
  ) {
    return jsonResponse(
      { error: `Choose between 1 and ${maxImageCount} images.` },
      400,
    );
  }

  if (typeof productId === "string") {
    const { data: product, error } = await supabase
      .from("products")
      .select("id")
      .eq("id", productId)
      .maybeSingle();
    if (error) {
      console.error(
        "Unable to verify product before signing image uploads:",
        error,
      );
      return jsonResponse(
        { error: "Image uploads could not be prepared." },
        500,
      );
    }
    if (!product) {
      return jsonResponse({ error: "Product not found." }, 404);
    }
  }

  const { data: slugOwner, error: slugLookupError } = await supabase
    .from("products")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();
  if (slugLookupError) {
    console.error(
      "Unable to check product slug before signing image uploads:",
      slugLookupError,
    );
    return jsonResponse({ error: "Image uploads could not be prepared." }, 500);
  }
  if (slugOwner && slugOwner.id !== productId) {
    return jsonResponse({
      error: "A product with this web slug already exists.",
    }, 409);
  }

  const uploads = await createSignedUploads(slug.toLowerCase(), indexes);
  return jsonResponse({ ...getCloudinaryCredentials(), uploads });
}

export async function handleDeleteImages(
  body: Record<string, unknown>,
): Promise<Response> {
  const images = body["images"];
  if (!Array.isArray(images)) {
    return jsonResponse({ error: "Invalid image cleanup request." }, 400);
  }

  const assets: CloudinaryAsset[] = [];
  for (const image of images) {
    if (
      !isRecord(image) ||
      typeof image["public_id"] !== "string" ||
      typeof image["secure_url"] !== "string"
    ) {
      return jsonResponse({ error: "Invalid image cleanup request." }, 400);
    }
    const asset = {
      public_id: image["public_id"],
      secure_url: image["secure_url"],
    };
    if (!isCloudinaryAsset(asset)) {
      return jsonResponse({ error: "Invalid image cleanup request." }, 400);
    }
    assets.push(asset);
  }

  await deleteCloudinaryAssets(assets);
  return jsonResponse({ ok: true });
}
