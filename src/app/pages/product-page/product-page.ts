import { CurrencyPipe } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from '../../models/product';

import { CartService } from '../../services/cart-service';
import { ProductService } from '../../services/product-service';
import { markdownToHtml } from '../../utils/markdown';

@Component({
  selector: 'app-product-page',
  imports: [CurrencyPipe],
  templateUrl: './product-page.html',
  styleUrl: './product-page.scss',
})
export class ProductPage implements OnInit {
  product = signal<Product>({} as Product);

  isSold = computed(() => this.product().sold);
  isInCart = computed(() => this.cart.hasProduct(this.product().id));

  descriptionHtml = signal<string>('');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    public cart: CartService,
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
