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

  async ngOnInit() {
    await this.cartService.refresh();
  }

  checkout() {
    alert(`Total amount: ${this.cartService.totalPrice().toFixed(2)}`);
    this.cartService.clear();
  }
}
