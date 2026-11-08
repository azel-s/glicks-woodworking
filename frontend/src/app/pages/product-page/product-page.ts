import { CurrencyPipe } from '@angular/common';
import { Component, computed, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Product } from '../../models/product';
import { ProductImage } from '../../models/product-image';

import { ProductService } from '../../services/product-service';
import { AdminService } from '../../services/admin-service';
import { AdminAuthService } from '../../services/admin-auth-service';
import { markdownToHtml } from '../../utils/markdown';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

type EditableProductImage =
  | { id: string; url: string; description: string }
  | { file: File; url: string; description: string };

@Component({
  selector: 'app-product-page',
  imports: [CurrencyPipe, RouterLink, ButtonModule, DialogModule, FormsModule],
  templateUrl: './product-page.html',
  styleUrl: './product-page.scss',
})
export class ProductPage implements OnInit, OnDestroy {
  product = signal<Product>({} as Product);
  admin_email = signal('');
  admin_phone = signal('');
  isAdmin = signal(false);
  isEditing = signal(false);
  saving = signal(false);
  deleting = signal(false);
  confirmingDelete = signal(false);
  deleteError = signal('');
  editError = signal('');
  editImages = signal<EditableProductImage[]>([]);
  editTitle = '';
  editSlug = '';
  editDescription = '';
  editPrice = 0;
  editSold = false;

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
    private adminAuthService: AdminAuthService,
  ) {}

  async ngOnInit() {
    try {
      this.isAdmin.set(await this.adminAuthService.isAdmin());
    } catch (error) {
      console.error('Unable to verify product editing access:', error);
    }

    Promise.all([this.adminService.getContactEmail(), this.adminService.getContactPhone()])
      .then(([email, phone]) => {
        this.admin_email.set(email);
        this.admin_phone.set(phone);
      })
      .catch((error) => console.error('Error fetching admin contact details:', error));

    try {
      await this.loadProduct(this.route.snapshot.paramMap.get('slug')!);
    } catch (error) {
      console.error('Error fetching product data:', error);
      this.router.navigate(['/404']);
    }
  }

  private async loadProduct(slug: string): Promise<void> {
    const product = await this.productService.getProductBySlug(slug);
    this.product.set(product);
    this.descriptionHtml.set(markdownToHtml(product.description));
    this.mainImageIndex.set(0);
  }

  startEditing(): void {
    const product = this.product();
    this.editTitle = product.title;
    this.editSlug = product.slug;
    this.editDescription = product.description;
    this.editPrice = product.price;
    this.editSold = product.sold;
    this.editImages.set(
      (product.images ?? []).map(({ id, url, description }) => ({ id, url, description })),
    );
    this.editError.set('');
    this.isEditing.set(true);
  }

  cancelEditing(): void {
    this.revokeNewImageUrls();
    this.isEditing.set(false);
    this.editError.set('');
  }

  addImage(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    const availableSlots = 10 - this.editImages().length;
    const filesToAdd = files.slice(0, availableSlots);

    if (filesToAdd.length) {
      const newImages = filesToAdd.map((file) => ({
        file,
        url: URL.createObjectURL(file),
        description: '',
      }));
      this.editImages.update((images) => [...images, ...newImages]);
    }

    if (files.length > availableSlots) {
      this.editError.set(
        `A product can have up to 10 images. Added ${filesToAdd.length} of the selected images.`,
      );
    } else if (filesToAdd.length) {
      this.editError.set('');
    }
    input.value = '';
  }

  removeImage(index: number): void {
    const images = [...this.editImages()];
    if (images.length <= 1) {
      return;
    }
    const [removed] = images.splice(index, 1);
    if (removed && 'file' in removed) {
      URL.revokeObjectURL(removed.url);
    }
    this.editImages.set(images);
  }

  moveImage(index: number, offset: number): void {
    const images = [...this.editImages()];
    const targetIndex = index + offset;
    if (targetIndex < 0 || targetIndex >= images.length) {
      return;
    }
    [images[index], images[targetIndex]] = [images[targetIndex], images[index]];
    this.editImages.set(images);
  }

  updateImageDescription(index: number, description: string): void {
    this.editImages.update((images) =>
      images.map((image, imageIndex) =>
        imageIndex === index ? { ...image, description } : image,
      ),
    );
  }

  async saveProduct(): Promise<void> {
    this.editError.set('');
    if (this.saving()) {
      return;
    }
    if (!this.editTitle.trim() || !this.editSlug.trim() || !this.editDescription.trim()) {
      this.editError.set('Title, slug, and description are required.');
      return;
    }
    if (!Number.isFinite(this.editPrice) || this.editPrice < 0) {
      this.editError.set('Enter a valid non-negative price.');
      return;
    }
    if (this.editImages().length < 1 || this.editImages().length > 10) {
      this.editError.set('Keep at least 1 and no more than 10 product images.');
      return;
    }

    this.saving.set(true);
    try {
      const slug = this.editSlug.trim();
      await this.productService.updateProduct(
        {
          id: this.product().id,
          title: this.editTitle.trim(),
          slug,
          description: this.editDescription.trim(),
          price: this.editPrice,
          sold: this.editSold,
        },
        this.editImages().map((image) =>
          'id' in image
            ? { id: image.id, url: image.url, description: image.description }
            : { file: image.file, description: image.description },
        ),
        (this.product().images ?? []).map((image) => image.url),
      );
      await this.router.navigate(['/product', slug]);
      await this.loadProduct(slug);
      this.revokeNewImageUrls();
      this.isEditing.set(false);
    } catch (error) {
      console.error('Product update failed:', error);
      this.editError.set(
        error instanceof Error ? error.message : 'Product update failed. Please try again.',
      );
    } finally {
      this.saving.set(false);
    }
  }

  requestDelete(): void {
    this.deleteError.set('');
    this.confirmingDelete.set(true);
  }

  cancelDelete(): void {
    if (!this.deleting()) {
      this.confirmingDelete.set(false);
      this.deleteError.set('');
    }
  }

  async deleteProduct(): Promise<void> {
    if (this.deleting()) {
      return;
    }

    this.deleting.set(true);
    this.deleteError.set('');
    try {
      await this.productService.deleteProduct(this.product().id);
      await this.router.navigate(['/']);
    } catch (error) {
      console.error('Product deletion failed:', error);
      this.deleteError.set(
        error instanceof Error ? error.message : 'Product deletion failed. Please try again.',
      );
      this.deleting.set(false);
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

  ngOnDestroy(): void {
    this.revokeNewImageUrls();
  }

  private revokeNewImageUrls(): void {
    this.editImages()
      .filter((image): image is Extract<EditableProductImage, { file: File }> => 'file' in image)
      .forEach((image) => URL.revokeObjectURL(image.url));
    this.editImages.set([]);
  }
}
