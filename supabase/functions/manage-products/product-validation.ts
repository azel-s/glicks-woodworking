import { type CloudinaryAsset, isCloudinaryAsset } from "./cloudinary.ts";
import { isRecord } from "./http.ts";

export const maxImageCount = 10;

export interface ProductDetails {
  title: string;
  slug: string;
  description: string;
  price: number;
}

export interface CreateImage extends CloudinaryAsset {
  description: string;
}

export interface ExistingImage {
  id: string;
  description: string;
}

export interface NewImage extends CreateImage {
  id?: never;
}

export type UpdateImage = ExistingImage | NewImage;

export interface UpdatedProduct extends ProductDetails {
  id: string;
  sold: boolean;
}

export function parseProductDetails(value: unknown): ProductDetails | null {
  if (
    !isRecord(value) ||
    typeof value["title"] !== "string" ||
    !value["title"].trim() ||
    typeof value["slug"] !== "string" ||
    !value["slug"].trim() ||
    typeof value["description"] !== "string" ||
    !value["description"].trim() ||
    typeof value["price"] !== "number" ||
    !Number.isFinite(value["price"]) ||
    value["price"] < 0
  ) {
    return null;
  }

  return {
    title: value["title"].trim(),
    slug: value["slug"].trim(),
    description: value["description"].trim(),
    price: value["price"],
  };
}

export function parseCreateImages(value: unknown): CreateImage[] | null {
  if (!isValidImageCount(value)) {
    return null;
  }

  const images: CreateImage[] = [];
  for (const image of value) {
    if (
      !isRecord(image) ||
      typeof image["public_id"] !== "string" ||
      typeof image["secure_url"] !== "string" ||
      typeof image["description"] !== "string"
    ) {
      return null;
    }

    const asset = {
      public_id: image["public_id"],
      secure_url: image["secure_url"],
    };
    if (!isCloudinaryAsset(asset)) {
      return null;
    }
    images.push({ ...asset, description: image["description"] });
  }
  return images;
}

export function parseUpdateImages(value: unknown): UpdateImage[] | null {
  if (!isValidImageCount(value)) {
    return null;
  }

  const images: UpdateImage[] = [];
  for (const image of value) {
    if (!isRecord(image)) {
      return null;
    }

    if (
      typeof image["id"] === "string" &&
      image["id"].length > 0
    ) {
      if (
        image["description"] !== undefined &&
        image["description"] !== null &&
        typeof image["description"] !== "string"
      ) {
        return null;
      }
      images.push({
        id: image["id"],
        description: typeof image["description"] === "string"
          ? image["description"]
          : "",
      });
      continue;
    }

    if (
      image["id"] === undefined &&
      typeof image["public_id"] === "string" &&
      typeof image["secure_url"] === "string" &&
      typeof image["description"] === "string"
    ) {
      const asset = {
        public_id: image["public_id"],
        secure_url: image["secure_url"],
      };
      if (isCloudinaryAsset(asset)) {
        images.push({ ...asset, description: image["description"] });
        continue;
      }
    }
    return null;
  }
  return images;
}

function isValidImageCount(value: unknown): value is unknown[] {
  return Array.isArray(value) && value.length >= 1 &&
    value.length <= maxImageCount;
}
