import { CurrencyPipe, NgClass } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from '../../models/product';

import { ProductService } from '../../services/product-service';
import { markdownToHtml } from '../../utils/markdown';

@Component({
  selector: 'app-product-page',
  imports: [CurrencyPipe, NgClass],
  templateUrl: './product-page.html',
  styleUrl: './product-page.scss',
})
export class ProductPage implements OnInit {
  product = signal<Product>({} as Product);

  isSold = computed(() => this.product().sold);

  descriptionHtml = signal<string>('');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
  ) {}

  async ngOnInit() {
    try {
      const slug = this.route.snapshot.paramMap.get('slug')!;

      const product = await this.productService.getProductBySlug(slug);
      this.product.set(product);

      const descriptionHtml = markdownToHtml(product.description);
      this.descriptionHtml.set(descriptionHtml);
    } catch (error) {
      console.error('Error fetching product data:', error);
      this.router.navigate(['/404']);
    }
  }
}
