import { effect, Injectable, OnInit, signal } from '@angular/core';

import { CartProduct } from '../models/cart-product';
import { Product } from '../models/product';
import { ProductImage } from '../models/product-image';
import { ProductService } from './product-service';

const CART_PRODUCTS_KEY = 'cart_products';

@Injectable({ providedIn: 'root' })
export class CartService {
  private products = signal<CartProduct[]>(this.loadFromStorage());
  private channel = new BroadcastChannel('cart_channel');

  constructor(private productService: ProductService) {
    effect(() => {
      this.saveToStorage(this.products());
      this.channel.postMessage(this.products());
    });

    this.channel.onmessage = (event) => {
      this.products.set(event.data);
    };
  }

  getProducts(): readonly CartProduct[] {
    return [...this.products()].sort((a, b) => a.title.localeCompare(b.title));
  }

  add(product: Product, images: ProductImage[]) {
    const current = this.products();

    if (!current.find((p) => p.id === product.id)) {
      this.products.set([...current, { ...product, images }]);
    }

    console.log('Cart products after adding:', this.products());
  }

  remove(productId: string) {
    this.products.set(this.products().filter((p) => p.id !== productId));
  }

  clear() {
    this.products.set([]);
  }

  hasProduct(productId: string): boolean {
    return !!this.products().find((p) => p.id === productId);
  }

  totalPrice(): number {
    return this.products().reduce((sum, p) => sum + p.price, 0);
  }

  async refresh() {
    const ids = this.products().map((product) => product.id);
    const updateProducts = await this.productService.getCartProductsByIds(ids);
    this.products.set(updateProducts);
  }

  // Private methods to handle localStorage
  private loadFromStorage(): CartProduct[] {
    const cart = localStorage.getItem(CART_PRODUCTS_KEY);
    return cart ? JSON.parse(cart) : [];
  }

  private saveToStorage(products: CartProduct[]) {
    localStorage.setItem(CART_PRODUCTS_KEY, JSON.stringify(products));
  }
}
