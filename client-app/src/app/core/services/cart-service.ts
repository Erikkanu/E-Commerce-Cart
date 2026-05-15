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

  // Total price calculation (backend will re-calculate during checkout)
  totalPrice = computed(() =>
    this.cartItems().reduce((acc, curr) => acc + curr.price, 0)
  );

  addToCart(product: Product) {
    this.cartItems.update(prev => [...prev, product]);
  }

  removeOne(productId: number) {
    this.cartItems.update(prev => {
      const index = prev.findIndex(item => item.id === productId);
      if (index > -1) {
        return [...prev.slice(0, index), ...prev.slice(index + 1)];
      }
      return prev;
    });
  }

  removeAll(productId: number) {
    this.cartItems.update(prev => prev.filter(item => item.id !== productId));
  }

  clearCart() {
    this.cartItems.set([]);
  }
}
