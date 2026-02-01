import { ProductImage } from './product-image';

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  sold: boolean;
  images?: ProductImage[];
  created_at: string;
  updated_at: string;
}
