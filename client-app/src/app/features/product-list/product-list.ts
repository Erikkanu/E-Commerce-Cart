import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ApiService } from '../../core/services/api';
import { CartService } from '../../core/state/cart';
import { Product } from '../../core/models/product.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [CurrencyPipe],
  template: `
    <div class="product-container">
      <h2>Available Products</h2>

      <div class="product-grid">
        <!-- We just iterate over the signal directly now! -->
        @for (product of products(); track product.id) {
          <div class="product-card">
            <h3>{{ product.name }}</h3>
            <p>{{ product.description }}</p>
            <p class="price">{{ product.price | currency }}</p>
            <button (click)="addToCart(product)">Add to Cart</button>
          </div>
        } @empty {
          <p>Loading products or no products found...</p>
        }
      </div>
    </div>
  `,
  styles: `
    .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; }
    .product-card { border: 1px solid #ccc; padding: 1rem; border-radius: 8px; background: #f9f9f9; }
    .price { font-weight: bold; color: #2c3e50; }
    button { cursor: pointer; background: #007bff; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; }
    button:hover { background: #0056b3; }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  private apiService = inject(ApiService);
  private cartService = inject(CartService);

  // Directly expose the signal
  protected products = this.apiService.products;

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
