import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { ProductImage } from '../models/product-image';
import { SupabaseService } from './supabase-service';
import { CartProduct } from '../models/cart-product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private supabaseService: SupabaseService) {}

  async getProducts(includeSold: boolean): Promise<Product[]> {
    const supabase = this.supabaseService.getClient();

    let query = supabase.from('products').select('*').order('created_at', { ascending: false });
    query = includeSold ? query : query.eq('sold', false);

    const { data, error } = await query;
    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }

    return data || [];
  }

  async getProductImages(productId: string): Promise<ProductImage[]> {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('product_images')
      .select('*')
      .eq('product_id', productId)
      .order('index', { ascending: true });

    if (error) {
      console.error('Error fetching images:', error);
      return [];
    }

    return data || [];
  }

  async getProductBySlug(slug: string): Promise<Product> {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase.from('products').select('*').eq('slug', slug).single();

    if (error) {
      console.error('Error fetching product:', error);
      throw error;
    }

    return data;
  }

  async getCartProductsByIds(ids: string[]): Promise<CartProduct[]> {
    if (!ids.length) return [];

    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('products')
      .select(`*, product_images(*)`)
      .in('id', ids)
      .order('title', { ascending: true });

    if (error) {
      console.error('Error fetching products by IDs:', error);
      return [];
    }

    // Map data to include images array
    return (data || []).map((p: any) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      price: p.price,
      sold: p.sold,
      slug: p.slug,
      images: p.product_images || [],
    })) as CartProduct[];
  }
}
