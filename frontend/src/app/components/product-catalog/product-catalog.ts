import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-catalog',
  imports: [RouterLink, CurrencyPipe, ButtonModule],
  templateUrl: './product-catalog.html',
  styleUrl: './product-catalog.scss',
})
export class ProductCatalog {
  products = input.required<Product[]>();
  eyebrow = input.required<string>();
  title = input.required<string>();
  subtitle = input.required<string>();
  ariaLabel = input.required<string>();
  emptyTitle = input.required<string>();
  emptyDescription = input.required<string>();
}
