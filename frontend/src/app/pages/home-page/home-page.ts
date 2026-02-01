import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Component, signal } from '@angular/core';

import { Product } from '../../models/product';
import { ProductService } from '../../services/product-service';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  products = signal<Product[]>([]);

  constructor(private productService: ProductService) {}

  async ngOnInit(): Promise<void> {
    const products = await this.productService.getProducts(true, false);
    this.products.set(products);
  }
}
