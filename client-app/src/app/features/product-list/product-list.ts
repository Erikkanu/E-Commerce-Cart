import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ApiService } from '../../core/services/api';
import { CartService } from '../../core/services/cart-service';
import { Product } from '../../core/models/product.model';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [CurrencyPipe, NgOptimizedImage],
  styleUrl: './product-list.scss',
  template: `
    <section class="products-section">
      <div class="products-container">
        <div class="product-grid">
          @for (product of products(); track product.id) {
            <div class="product-card">
              <div class="product-image-wrapper">
                <div class="product-image-placeholder">
                  @if (product.imageUrl) {
                    <img class="image-icon" ngSrc="{{ product.imageUrl }}" alt="{{ product.name }}" width="250" height="250" priority>
                  } @else {
                    <div class="image-fallback">No Image</div>
                  }
                </div>
              </div>
              <div class="product-info">
                <h3 class="product-name">{{ product.name }}</h3>
                <p class="product-description">{{ product.description }}</p>
                <div class="product-footer">
                  <span class="product-price">{{ product.price | currency }}</span>
                  <button class="btn-add-cart" (click)="addToCart(product)">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          } @empty {
            <div class="empty-state">
              <p>Loading products or no products found...</p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  private apiService = inject(ApiService);
  private cartService = inject(CartService);

  protected products = this.apiService.products;

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
