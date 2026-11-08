export interface CloudinaryAsset {
  public_id: string;
  secure_url: string;
}

export interface SignedUpload {
  timestamp: string;
  assetFolder: string;
  publicId: string;
  signature: string;
}

const cloudName = Deno.env.get("CLOUDINARY_CLOUD_NAME") ?? "dshr10hah";
const apiKey = Deno.env.get("CLOUDINARY_API_KEY");
const apiSecret = Deno.env.get("CLOUDINARY_API_SECRET");
const folder = "glicks-woodworking/products";

export function isCloudinaryConfigured(): boolean {
  return Boolean(apiKey && apiSecret);
}

async function signParams(params: Record<string, string>): Promise<string> {
  const canonical = Object.entries(params)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  const digest = await crypto.subtle.digest(
    "SHA-1",
    new TextEncoder().encode(`${canonical}${apiSecret}`),
  );
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export function isCloudinaryAsset(asset: CloudinaryAsset): boolean {
  try {
    const url = new URL(asset.secure_url);
    const publicId = asset.public_id.startsWith(`${folder}/`)
      ? asset.public_id.slice(folder.length + 1)
      : asset.public_id;
    return (
      url.protocol === "https:" &&
      url.hostname === "res.cloudinary.com" &&
      url.pathname.startsWith(`/${cloudName}/image/upload/`) &&
      (/^[\da-f-]{36}$/i.test(publicId) ||
        /^[a-z0-9]+(?:-[a-z0-9]+)*\/[1-9]\d*$/i.test(publicId))
    );
  } catch {
    return false;
  }
}

export function createSignedUploads(
  slug: string,
  indexes: number[],
): Promise<SignedUpload[]> {
  return Promise.all(
    indexes.map(async (index) => {
      const timestamp = Math.floor(Date.now() / 1000).toString();
      const assetFolder = `${folder}/${slug}`;
      const publicId = `${assetFolder}/${index + 1}`;
      const params = {
        asset_folder: assetFolder,
        overwrite: "true",
        public_id: publicId,
        timestamp,
      };
      return {
        timestamp,
        assetFolder,
        publicId,
        signature: await signParams(params),
      };
    }),
  );
}

export function getCloudinaryCredentials(): {
  cloudName: string;
  apiKey: string;
} {
  if (!apiKey) {
    throw new Error("Cloudinary API key is not configured.");
  }
  return { cloudName, apiKey };
}

export function cloudinaryAssetFromUrl(url: string): CloudinaryAsset | null {
  try {
    const parsedUrl = new URL(url);
    const segments = parsedUrl.pathname.split("/").filter(Boolean);
    const uploadIndex = segments.indexOf("upload");
    if (uploadIndex < 0) {
      return null;
    }

    const publicIdSegments = segments
      .slice(uploadIndex + 1)
      .filter((segment) => !/^v\d+$/.test(segment));
    const lastSegment = publicIdSegments.at(-1);
    if (!lastSegment) {
      return null;
    }

    publicIdSegments[publicIdSegments.length - 1] = lastSegment.replace(
      /\.[^.]+$/,
      "",
    );
    const asset = {
      public_id: publicIdSegments.join("/"),
      secure_url: url,
    };
    return isCloudinaryAsset(asset) ? asset : null;
  } catch {
    return null;
  }
}

export async function deleteCloudinaryAssets(
  assets: CloudinaryAsset[],
): Promise<boolean> {
  let succeeded = true;
  for (const asset of assets) {
    if (!isCloudinaryAsset(asset)) {
      console.error("Skipped cleanup for an unrecognized Cloudinary asset.");
      succeeded = false;
      continue;
    }
    if (!apiKey || !apiSecret) {
      console.error(
        "Cannot clean up Cloudinary assets without configured credentials.",
      );
      return false;
    }

    const timestamp = Math.floor(Date.now() / 1000).toString();
    const signature = await signParams({
      public_id: asset.public_id,
      timestamp,
    });
    const form = new FormData();
    form.set("public_id", asset.public_id);
    form.set("api_key", apiKey);
    form.set("timestamp", timestamp);
    form.set("signature", signature);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
        { method: "POST", body: form },
      );
      if (!response.ok) {
        console.error(
          "Unable to clean up Cloudinary image:",
          asset.public_id,
          await response.text(),
        );
        succeeded = false;
      }
    } catch (error) {
      console.error(
        "Unable to reach Cloudinary to clean up image:",
        asset.public_id,
        error,
      );
      succeeded = false;
    }
  }
  return succeeded;
}

export async function deleteCloudinaryProductFolder(
  slug: string,
): Promise<boolean> {
  if (!apiKey || !apiSecret) {
    console.error(
      "Cannot delete Cloudinary product folder without API credentials.",
    );
    return false;
  }
  if (!/^[a-z0-9][a-z0-9_-]{0,199}$/i.test(slug)) {
    console.error("Skipped deletion for an invalid product slug.");
    return false;
  }

  const assetFolder = `${folder}/${slug}`;
  const folderPath = assetFolder.split("/").map(encodeURIComponent).join("/");
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/folders/${folderPath}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Basic ${btoa(`${apiKey}:${apiSecret}`)}`,
        },
      },
    );
    if (response.status === 404) {
      return true;
    }
    if (!response.ok) {
      console.error(
        "Unable to delete Cloudinary product folder:",
        assetFolder,
        await response.text(),
      );
      return false;
    }
    return true;
  } catch (error) {
    console.error(
      "Unable to reach Cloudinary to delete product folder:",
      assetFolder,
      error,
    );
    return false;
  }
}
