import { CurrencyPipe } from '@angular/common';
import { Component, computed, OnInit } from '@angular/core';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-cart-page',
  imports: [CurrencyPipe],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.scss',
})
export class CartPage implements OnInit {
  constructor(public cartService: CartService) {}

  availableProducts = computed(() => this.cartService.getProducts().filter((p) => !p.sold));
  soldProducts = computed(() => this.cartService.getProducts().filter((p) => p.sold));
  totalPrice = computed(() => this.availableProducts().reduce((sum, p) => sum + p.price, 0));

  async ngOnInit() {
    await this.cartService.refresh();
  }

  async checkout() {
    if (!this.availableProducts().length) return;

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: this.availableProducts() }),
      });

      const data = await res.json();
      console.log('Checkout data', data);
      window.location.href = data.url;
    } catch (err) {
      console.error('Checkout error', err);
    }
  }
}
