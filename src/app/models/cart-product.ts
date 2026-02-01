import { Product } from './product';
import { ProductImage } from './product-image';

export interface CartProduct extends Product {
  images?: ProductImage[];
}
