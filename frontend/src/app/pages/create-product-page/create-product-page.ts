import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';

import { OnDestroy } from '@angular/core';

interface TempProductImage {
  url: string;
  file: File;
  description: string;
}

@Component({
  selector: 'create-product-page',
  imports: [FormsModule, DialogModule, InputTextModule, TextareaModule, InputNumberModule, ButtonModule],
  templateUrl: './create-product-page.html',
  styleUrl: './create-product-page.scss',
})
export class CreateProductPage implements OnDestroy {
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
  temp_description_idx = signal<number | null>(null);

  addImage(event: Event) {
    const element = event.target as HTMLInputElement;
    const fileList: FileList | null = element.files;

    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      const temp_image: TempProductImage = { url: URL.createObjectURL(file), file: file, description: ''};

      this.temp_images.update((images) => [...images, temp_image]);
    }

    element.value = '';
  }

  updateImageDescription(event: Event): void {
    const index = this.temp_description_idx();
    if (index === null) {
      return;
    }

    const description = (event.target as HTMLTextAreaElement).value;
    this.temp_images.update((images) =>
      images.map((image, imageIndex) =>
        imageIndex === index ? { ...image, description } : image,
      ),
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

  ngOnDestroy(): void {
    this.temp_images().forEach((image) => URL.revokeObjectURL(image.url));
  }
}
