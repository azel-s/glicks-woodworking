import { Component, signal } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product-service';
import { ProductCatalog } from '../../components/product-catalog/product-catalog';

@Component({
  selector: 'app-home-page',
  imports: [ProductCatalog],
  templateUrl: './home-page.html',
})
export class HomePage {
  products = signal<Product[]>([]);

  constructor(private productService: ProductService) {}

  async ngOnInit(): Promise<void> {
    const products = await this.productService.getProducts(true, false);
    this.products.set(products);
  }
}
