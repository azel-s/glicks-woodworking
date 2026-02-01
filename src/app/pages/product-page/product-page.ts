import { CurrencyPipe } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from '../../models/product';
import { ProductImage } from '../../models/product-image';

import { ProductService } from '../../services/product-service';
import { markdownToHtml } from '../../utils/markdown';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-product-page',
  imports: [CurrencyPipe],
  templateUrl: './product-page.html',
  styleUrl: './product-page.scss',
})
export class ProductPage implements OnInit {
  product = signal<Product>({} as Product);
  images = signal<ProductImage[]>([]);

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

      const descriptionHtml = await markdownToHtml(product.description);
      this.descriptionHtml.set(descriptionHtml);

      const images = await this.productService.getProductImages(product.id);
      this.images.set(images);
    } catch (error) {
      console.error('Error fetching product data:', error);
      this.router.navigate(['/404']);
    }
  }
}
