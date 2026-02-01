import { effect, Injectable, signal } from '@angular/core';

import { Product } from '../models/product';
import { ProductService } from './product-service';

const CART_PRODUCTS_KEY = 'cart_products';

@Injectable({ providedIn: 'root' })
export class CartService {
  private products = signal<Product[]>(this.loadFromStorage());
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

  getProducts(): readonly Product[] {
    return [...this.products()].sort((a, b) => a.title.localeCompare(b.title));
  }

  add(product: Product) {
    const current = this.products();

    if (!current.find((p) => p.id === product.id)) {
      this.products.set([...current, product]);
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

  async refresh() {
    const ids = this.products().map((product) => product.id);
    const updateProducts = await this.productService.getCartProductsByIds(ids);
    this.products.set(updateProducts);
  }

  // Private methods to handle localStorage
  private loadFromStorage(): Product[] {
    const cart = localStorage.getItem(CART_PRODUCTS_KEY);
    return cart ? JSON.parse(cart) : [];
  }

  private saveToStorage(products: Product[]) {
    localStorage.setItem(CART_PRODUCTS_KEY, JSON.stringify(products));
  }
}
