import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product-service';
import { markdownToText } from '../../utils/markdown';

@Component({
  selector: 'app-sold-products-page',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './sold-products-page.html',
  styleUrl: './sold-products-page.scss',
})
export class SoldProductsPage implements OnInit {
  products = signal<Product[]>([]);

  constructor(private productService: ProductService) {}

  async ngOnInit() {
    try {
      const products = await this.productService.getProducts(false, true);
      this.products.set(products.map((p) => ({ ...p, description: markdownToText(p.description) })));
    } catch (error) {
      console.error('Error fetching sold products:', error);
    }
  }
}
