import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { SupabaseService } from './supabase-service';
import { environment } from '../../environments/environment';

interface CloudinaryUpload {
  timestamp: string;
  assetFolder: string;
  publicId: string;
  signature: string;
}

interface CloudinaryAsset {
  public_id: string;
  secure_url: string;
}

export type ProductImageEdit =
  | { id: string; url: string; description: string }
  | { file: File; description: string };

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private supabaseService: SupabaseService) {}

  async createProduct(
    product: Pick<Product, 'title' | 'slug' | 'description' | 'price'>,
    images: { file: File; description: string }[],
  ): Promise<void> {
    const accessToken = await this.getAdminAccessToken();
    const uploadedAssets = await this.uploadImages(
      accessToken,
      product.slug,
      images.map((image, index) => ({ ...image, index })),
    );
    await this.callCreateProductFunction(accessToken, {
      action: 'create-product',
      product,
      images: uploadedAssets.map((asset, index) => ({
        ...asset,
        description: images[index].description,
      })),
    });
  }

  async updateProduct(
    product: Pick<Product, 'id' | 'title' | 'slug' | 'description' | 'price' | 'sold'>,
    images: ProductImageEdit[],
    existingImageUrls: string[],
  ): Promise<void> {
    const accessToken = await this.getAdminAccessToken();
    const newImages = images.flatMap((image, index) =>
      'file' in image ? [{ ...image, index }] : [],
    );
    const existingImagePublicIds = new Set(
      existingImageUrls
        .map((url) => this.cloudinaryPublicIdFromUrl(url))
        .filter((publicId): publicId is string => publicId !== null),
    );
    const uploadedAssets = await this.uploadImages(
      accessToken,
      product.slug,
      newImages,
      existingImagePublicIds,
      product.id,
    );
    const uploadsByIndex = new Map(
      newImages.map((image, index) => [image.index, uploadedAssets[index]]),
    );
    const imageUpdates = images.map((image, index) => {
      if ('id' in image) {
        return image;
      }

      return {
        ...uploadsByIndex.get(index),
        description: image.description,
      };
    });

    await this.callCreateProductFunction(accessToken, {
      action: 'update-product',
      product,
      images: imageUpdates,
    });
  }

  async deleteProduct(id: string): Promise<void> {
    const accessToken = await this.getAdminAccessToken();
    await this.callCreateProductFunction(accessToken, {
      action: 'delete-product',
      id,
    });
  }

  private async getAdminAccessToken(): Promise<string> {
    const { data, error } = await this.supabaseService.getClient().auth.getSession();
    if (error) {
      throw error;
    }

    const accessToken = data.session?.access_token;
    if (!accessToken) {
      throw new Error('Your admin session has expired. Please sign in again.');
    }

    return accessToken;
  }

  private async uploadImages(
    accessToken: string,
    slug: string,
    images: { file: File; description: string; index: number }[],
    protectedPublicIds = new Set<string>(),
    productId?: string,
  ): Promise<CloudinaryAsset[]> {
    if (!images.length) {
      return [];
    }

    const { cloudName, apiKey, uploads } = await this.callCreateProductFunction<{
      cloudName: string;
      apiKey: string;
      uploads: CloudinaryUpload[];
    }>(accessToken, {
      action: 'sign-upload',
      count: images.length,
      slug,
      indexes: images.map((image) => image.index),
      productId,
    });

    const uploadedAssets: CloudinaryAsset[] = [];
    try {
      for (const [index, image] of images.entries()) {
        const upload = uploads[index];
        const body = new FormData();
        body.set('file', image.file, image.file.name);
        body.set('api_key', apiKey);
        body.set('timestamp', upload.timestamp);
        body.set('asset_folder', upload.assetFolder);
        body.set('public_id', upload.publicId);
        body.set('overwrite', 'true');
        body.set('signature', upload.signature);

        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: 'POST',
          body,
        });
        const asset = (await response.json()) as CloudinaryAsset & {
          error?: { message?: string };
        };
        if (!response.ok || !asset.public_id || !asset.secure_url) {
          throw new Error(asset.error?.message || 'An image could not be uploaded.');
        }
        uploadedAssets.push(asset);
      }
    } catch (error) {
      if (uploadedAssets.length) {
        try {
          await this.callCreateProductFunction(accessToken, {
            action: 'delete-images',
            images: uploadedAssets.filter(
              (asset) => !protectedPublicIds.has(asset.public_id),
            ),
          });
        } catch (cleanupError) {
          console.error('Unable to clean up images after upload failure:', cleanupError);
        }
      }
      throw error;
    }

    return uploadedAssets;
  }

  private cloudinaryPublicIdFromUrl(url: string): string | null {
    try {
      const segments = new URL(url).pathname.split('/').filter(Boolean);
      const uploadIndex = segments.indexOf('upload');
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
      publicIdSegments[publicIdSegments.length - 1] = lastSegment.replace(/\.[^.]+$/, '');
      return publicIdSegments.join('/');
    } catch {
      return null;
    }
  }

  private async callCreateProductFunction<T = unknown>(
    accessToken: string,
    body: unknown,
  ): Promise<T> {
    const response = await fetch(`${environment.supabaseUrl}/functions/v1/manage-products`, {
      method: 'POST',
      headers: {
        apikey: environment.supabaseAnonKey,
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const responseText = await response.text();
    let result: { error?: string } & T;
    try {
      result = JSON.parse(responseText) as { error?: string } & T;
    } catch {
      throw new Error(`Product service returned an invalid response (${response.status}).`);
    }
    if (!response.ok) {
      throw new Error(result.error || 'Product creation failed. Please try again.');
    }

    return result;
  }

  async getProducts(includeAvailable: boolean, includeSold: boolean): Promise<Product[]> {
    const supabase = this.supabaseService.getClient();

    let query = supabase
      .from('products')
      .select('*, images: product_images(*)')
      .order('created_at', { ascending: false })
      .order('index', { referencedTable: 'product_images', ascending: true });
    if (!includeAvailable && includeSold) {
      query = query.eq('sold', true);
    } else if (includeAvailable && !includeSold) {
      query = query.eq('sold', false);
    } else if (!includeAvailable && !includeSold) {
      return [];
    }

    const { data, error } = await query;
    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }

    return data || [];
  }

  async getProductBySlug(slug: string): Promise<Product> {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('products')
      .select('*, images: product_images(*)')
      .eq('slug', slug)
      .order('index', { referencedTable: 'product_images', ascending: true })
      .single();

    if (error) {
      console.error('Error fetching product:', error);
      throw error;
    }

    return data;
  }

  async getCartProductsByIds(ids: string[]): Promise<Product[]> {
    if (!ids.length) return [];

    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('products')
      .select(`*, images: product_images(*)`)
      .in('id', ids)
      .order('title', { ascending: true });

    if (error) {
      console.error('Error fetching products by IDs:', error);
      return [];
    }

    // Map data to include images array
    return data || [];
  }
}
