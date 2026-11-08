import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { SupabaseService } from './supabase-service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private supabaseService: SupabaseService) {}

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
