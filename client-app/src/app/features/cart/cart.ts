import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart-service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './cart.scss', 
  template: `
    <section class="cart-section">
      <div class="cart-container">

        <div class="cart-header">
          <button class="back-btn" (click)="goBack()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Continue Shopping
          </button>
          <h1 class="cart-title">Your Cart
            @if (cartService.count() > 0) {
              <span class="item-count">{{ cartService.count() }} item{{ cartService.count() === 1 ? '' : 's' }}</span>
            }
          </h1>
        </div>

        @if (cartService.items().length === 0) {
          <div class="empty-cart">
            <div class="empty-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/>
              </svg>
            </div>
            <h2>Your cart is empty</h2>
            <p>Add some products to get started</p>
            <button class="btn-shop" (click)="goBack()">Browse Products</button>
          </div>
        } @else {
          <div class="cart-layout">

            <div class="cart-items">
              @for (entry of groupedItems(); track entry.product.id) {
                <div class="cart-item">
                  <div class="item-image">
                    @if (entry.product.imageUrl) {
                      <img [src]="entry.product.imageUrl" [alt]="entry.product.name" />
                    } @else {
                      <div class="image-fallback">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                          <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                          <path d="M21 15l-5-5L5 21"/>
                        </svg>
                      </div>
                    }
                  </div>
                  <div class="item-details">
                    <h3 class="item-name">{{ entry.product.name }}</h3>
                    <p class="item-description">{{ entry.product.description }}</p>
                    <span class="item-unit-price">{{ entry.product.price | currency }} each</span>
                  </div>
                  <div class="item-controls">
                    <div class="quantity-control">
                      <button class="qty-btn" (click)="removeOne(entry.product)" aria-label="Remove one">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                          <path d="M5 12h14"/>
                        </svg>
                      </button>
                      <span class="qty-value">{{ entry.quantity }}</span>
                      <button class="qty-btn" (click)="addOne(entry.product)" aria-label="Add one">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                          <path d="M12 5v14M5 12h14"/>
                        </svg>
                      </button>
                    </div>
                    <span class="item-subtotal">{{ entry.product.price * entry.quantity | currency }}</span>
                    <button class="remove-btn" (click)="removeAll(entry.product)" aria-label="Remove item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>
                      </svg>
                    </button>
                  </div>
                </div>
              }
            </div>

            <div class="order-summary">
              <h2 class="summary-title">Order Summary</h2>

              <div class="summary-lines">
                @for (entry of groupedItems(); track entry.product.id) {
                  <div class="summary-line">
                    <span>{{ entry.product.name }} × {{ entry.quantity }}</span>
                    <span>{{ entry.product.price * entry.quantity | currency }}</span>
                  </div>
                }
              </div>

              <div class="summary-divider"></div>

              <div class="summary-total estimated">
                <span>Total</span>
                <span class="total-amount">{{ cartService.totalPrice() | currency }}</span>
              </div>

              <button
                class="btn-checkout"
                routerLink="/checkout">
                Proceed to Checkout
              </button>
            </div>

          </div>
        }
      </div>
    </section>
  `
})
export class CartComponent {
  cartService = inject(CartService);
  private router = inject(Router);

  // Group duplicate products into { product, quantity } entries
  groupedItems = computed(() => {
    const map = new Map<number, { product: Product; quantity: number }>();

    for (const item of this.cartService.items()) {
      const existing = map.get(item.id);
      if (existing) {
        existing.quantity++;
      } else {
        map.set(item.id, { product: item, quantity: 1 });
      }
    }
    return Array.from(map.values());
  });

  addOne(product: Product) {
    this.cartService.addToCart(product);
  }

  removeOne(product: Product) {
    this.cartService.removeOne(product.id);
  }

  removeAll(product: Product) {
    this.cartService.removeAll(product.id);
  }

  goBack() {
    this.router.navigate(['/']);
  }
}