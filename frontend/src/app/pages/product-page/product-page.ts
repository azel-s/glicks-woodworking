import { CurrencyPipe } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Product } from '../../models/product';
import { ProductImage } from '../../models/product-image';

import { ProductService } from '../../services/product-service';
import { AdminService } from '../../services/admin-service';
import { markdownToHtml } from '../../utils/markdown';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-product-page',
  imports: [CurrencyPipe, RouterLink, ButtonModule],
  templateUrl: './product-page.html',
  styleUrl: './product-page.scss',
})
export class ProductPage implements OnInit {
  product = signal<Product>({} as Product);
  admin_email = signal('');
  admin_phone = signal('');

  isSold = computed(() => this.product().sold);
  emailLink = computed(() => {
    const action = this.isSold() ? 'Commission' : 'Inquiry';
    const subject = `${action}: ${this.product().title}`;
    return `mailto:${this.admin_email()}?subject=${encodeURIComponent(subject)}`;
  });
  phoneLink = computed(() => `tel:${this.admin_phone()}`);
  descriptionHtml = signal<string>('');

  mainImageIndex = signal<number>(0);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private adminService: AdminService,
  ) {}

  async ngOnInit() {
    Promise.all([this.adminService.getAdminEmail(), this.adminService.getAdminPhone()])
      .then(([email, phone]) => {
        this.admin_email.set(email);
        this.admin_phone.set(phone);
      })
      .catch((error) => console.error('Error fetching admin contact details:', error));

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

  changeMainImage(image: ProductImage) {
    // Replace the first image with the clicked thumbnail
    const currentImages = this.product().images ?? [];
    if (currentImages.length > 1) {
      // Create new array without first element, then add clicked image at front
      const remainingImages = currentImages.slice(1);
      this.product.set({ ...this.product(), images: [image, ...remainingImages] });
    }
  }
}
