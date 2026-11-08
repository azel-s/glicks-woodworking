import { Component, OnInit, signal } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product-service';
import { ProductCatalog } from '../../components/product-catalog/product-catalog';

@Component({
  selector: 'app-past-products-page',
  imports: [ProductCatalog],
  templateUrl: './past-products-page.html',
})
export class PastProductsPage implements OnInit {
  products = signal<Product[]>([]);

  constructor(private productService: ProductService) {}

  async ngOnInit() {
    try {
      const products = await this.productService.getProducts(false, true);
      this.products.set(products);
    } catch (error) {
      console.error('Error fetching sold products:', error);
    }
  }
}
