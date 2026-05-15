import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common'; 
import { CartService } from '../../core/services/cart-service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, CurrencyPipe], 
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './checkout.scss',
  template: `
    <section class="checkout-section">
      <div class="checkout-container">
        <h2>Checkout</h2>
        
        <div class="order-summary">
          <h3>Order Summary</h3>
          <div class="summary-row total">
            <span>Estimated Total:</span>
            <span>{{ cartService.totalPrice() | currency }}</span>
          </div>
          <p class="summary-note">Final price will be verified upon placement.</p>
        </div>

        <form [formGroup]="checkoutForm" (ngSubmit)="placeOrder()" class="checkout-form">
          <div class="form-group">
            <label for="name">Full Name</label>
            <input 
              id="name" 
              type="text" 
              formControlName="name" 
              [attr.aria-invalid]="isFieldInvalid('name')"
              placeholder="John Doe"
            />
            @if (isFieldInvalid('name')) {
              <span class="error-message" role="alert">Name is required.</span>
            }
          </div>

          <div class="form-group">
            <label for="address">Delivery Address</label>
            <input 
              id="address" 
              type="text" 
              formControlName="address" 
              [attr.aria-invalid]="isFieldInvalid('address')"
              placeholder="123 Main St"
            />
            @if (isFieldInvalid('address')) {
              <span class="error-message" role="alert">Address is required.</span>
            }
          </div>

          <div class="form-group">
            <label for="postalCode">Postal Code</label>
            <input 
              id="postalCode" 
              type="text" 
              formControlName="postalCode" 
              [attr.aria-invalid]="isFieldInvalid('postalCode')"
              placeholder="12345"
            />
            @if (isFieldInvalid('postalCode')) {
              <span class="error-message" role="alert">Postal code is required.</span>
            }
          </div>

          <fieldset class="form-group payment-group">
            <legend>Payment Method</legend>
            <div class="radio-option">
              <input type="radio" id="cash" value="cash" formControlName="paymentMethod" />
              <label for="cash">Cash on Delivery</label>
            </div>
            <div class="radio-option">
              <input type="radio" id="card" value="card" formControlName="paymentMethod" />
              <label for="card">Credit/Debit Card</label>
            </div>
            @if (isFieldInvalid('paymentMethod')) {
              <span class="error-message" role="alert">Please select a payment method.</span>
            }
          </fieldset>

          <button type="submit" class="btn-submit">
            Place Order • {{ cartService.totalPrice() | currency }}
          </button>
        </form>
      </div>
    </section>

    @if (showSuccessPopup()) {
      <div class="modal-overlay">
        <div class="modal-content" role="dialog" aria-labelledby="modal-title" aria-modal="true">
          <h3 id="modal-title">🎉 Order placed!</h3>
          <p>Thanks for shopping with us!</p>
          <button class="btn-close" (click)="closePopupAndRedirect()">Return to Home</button>
        </div>
      </div>
    }
  `,
})
export class CheckoutComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  protected cartService = inject(CartService);

  showSuccessPopup = signal(false);

  checkoutForm = this.fb.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
    postalCode: ['', Validators.required],
    paymentMethod: ['', Validators.required]
  });

  isFieldInvalid(fieldName: string): boolean {
    const field = this.checkoutForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  placeOrder() {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    this.showSuccessPopup.set(true);
  }

  closePopupAndRedirect() {
    this.showSuccessPopup.set(false);
    this.cartService.clearCart();
    this.router.navigate(['/']);
  }
}
