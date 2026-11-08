import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product-service';

import { OnDestroy } from '@angular/core';

interface TempProductImage {
  url: string;
  file: File;
  description: string;
}

const maxImageCount = 10;

@Component({
  selector: 'create-product-page',
  imports: [FormsModule, InputTextModule, TextareaModule, InputNumberModule, ButtonModule],
  templateUrl: './create-product-page.html',
  styleUrl: './create-product-page.scss',
})
export class CreateProductPage implements OnDestroy {
  constructor(
    private productService: ProductService,
    private router: Router,
  ) {}

  createError = '';
  saving = false;

  get missingRequirements(): string[] {
    const missing = [];

    if (!this.temp_product.title.trim()) missing.push('Title');
    if (!this.temp_product.slug.trim()) missing.push('Web Slug');
    if (!this.temp_product.description.trim()) missing.push('Description');
    if (this.temp_images().length === 0) missing.push('at least one image');

    return missing;
  }

  temp_product: Product = {
    id: '',
    title: '',
    slug: '',
    description: '',
    price: 0,
    sold: false,
    created_at: '',
    updated_at: '',
  };
  temp_images = signal<TempProductImage[]>([]);
  imageTouched = false;

  addImage(event: Event) {
    const element = event.target as HTMLInputElement;
    const files = Array.from(element.files ?? []);
    const availableSlots = maxImageCount - this.temp_images().length;
    const filesToAdd = files.slice(0, availableSlots);

    if (filesToAdd.length) {
      const newImages = filesToAdd.map((file): TempProductImage => ({
        url: URL.createObjectURL(file),
        file,
        description: '',
      }));
      this.temp_images.update((images) => [...images, ...newImages]);
    }

    if (files.length > availableSlots) {
      this.createError = `A product can have up to ${maxImageCount} images. Added ${filesToAdd.length} of the selected images.`;
    } else if (filesToAdd.length) {
      this.createError = '';
    }

    element.value = '';
  }

  updateImageDescription(event: Event, index: number): void {
    const description = (event.target as HTMLTextAreaElement).value;
    this.temp_images.update((images) =>
      images.map((image, imageIndex) => (imageIndex === index ? { ...image, description } : image)),
    );
  }

  moveImageBy(index: number, offset: number): void {
    const targetIndex = index + offset;
    const images = [...this.temp_images()];

    if (targetIndex < 0 || targetIndex >= images.length) {
      return;
    }

    [images[index], images[targetIndex]] = [images[targetIndex], images[index]];
    this.temp_images.set(images);
  }

  removeImage(index: number): void {
    const images = [...this.temp_images()];
    const [image] = images.splice(index, 1);

    if (image) {
      URL.revokeObjectURL(image.url);
      this.temp_images.set(images);
    }
  }

  async createProduct(): Promise<void> {
    this.createError = '';
    if (this.missingRequirements.length || this.saving) {
      return;
    }

    this.saving = true;
    try {
      await this.productService.createProduct(
        {
          title: this.temp_product.title.trim(),
          slug: this.temp_product.slug.trim(),
          description: this.temp_product.description.trim(),
          price: this.temp_product.price,
        },
        this.temp_images().map(({ file, description }) => ({ file, description })),
      );
      await this.router.navigate(['/product', this.temp_product.slug.trim()]);
    } catch (error) {
      console.error('Product creation failed:', error);
      this.createError =
        error instanceof Error ? error.message : 'Product creation failed. Please try again.';
    } finally {
      this.saving = false;
    }
  }

  ngOnDestroy(): void {
    this.temp_images().forEach((image) => URL.revokeObjectURL(image.url));
  }
}
