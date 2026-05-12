import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  // The private state of the cart
  private cartItems = signal<Product[]>([]);

  // Public read-only signals for components to consume
  items = this.cartItems.asReadonly();

  // This updates instantly whenever cartItems changes
  count = computed(() => this.cartItems().length);

  // Total price calculation (for the UI only - backend will re-calculate during checkout)
  totalPrice = computed(() =>
    this.cartItems().reduce((acc, curr) => acc + curr.price, 0)
  );

  addToCart(product: Product) {
    this.cartItems.update(prev => [...prev, product]);
  }

  clearCart() {
    this.cartItems.set([]);
  }
}
