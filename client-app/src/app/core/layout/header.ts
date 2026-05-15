import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { CartService } from '../services/cart-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <header class="header">
      <div class="header-left">
        <a routerLink="/products" class="store-title-link">
          <h1 class="store-title">Electronics Store</h1>
        </a>
      </div>
      <nav class="header-right">
        <button class="cart-button" aria-label="Shopping cart" routerLink="/cart">
          <svg class="cart-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.16.12-.33.12-.5 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
          @if (cartService.count() > 0) {
            <span class="cart-badge" [attr.aria-label]="'Cart items: ' + cartService.count()">
              {{ cartService.count() }}
            </span>
          }
        </button>
        @if (authService.isAuthenticated()) {
          <span class="user-greeting">Hello, {{ authService.currentUser()?.username }}</span>
          <button class="btn btn-secondary" (click)="logout()">Logout</button>
        } @else {
          <a routerLink="/login" class="btn btn-primary">Login</a>
          <a routerLink="/register" class="btn btn-primary">Register</a>
        }
      </nav>
    </header>
  `,
  styles: `
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .header-left {
      flex: 1;
    }

    .store-title {
      margin: 0;
      font-size: 1.8rem;
      font-weight: 700;
      letter-spacing: -0.5px;
    }

    .store-title-link {
      text-decoration: none;
      color: inherit;
      cursor: pointer;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .cart-button {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      background: rgba(255, 255, 255, 0.2);
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      padding: 0;
    }

    .cart-button:hover {
      background: rgba(255, 255, 255, 0.3);
      border-color: rgba(255, 255, 255, 0.5);
      transform: translateY(-2px);
    }

    .cart-button:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.5);
    }

    .cart-button:active {
      transform: translateY(0);
    }

    .cart-icon {
      width: 24px;
      height: 24px;
      fill: white;
    }

    .cart-badge {
      position: absolute;
      top: -8px;
      right: -8px;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 24px;
      height: 24px;
      padding: 0 6px;
      background: #ef4444;
      color: white;
      border: 2px solid white;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 700;
      line-height: 1;
    }

    .user-greeting {
      font-size: 0.95rem;
      margin-right: 0.5rem;
    }

    .btn {
      padding: 0.6rem 1.2rem;
      border: none;
      border-radius: 6px;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
      display: inline-block;
    }

    .btn-primary {
      background: #ffffff;
      color: #667eea;
    }

    .btn-primary:hover {
      background: #f0f0f0;
      transform: translateY(-2px);
    }

    .btn-secondary {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border: 2px solid white;
    }

    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  authService = inject(AuthService);
  cartService = inject(CartService);

  logout() {
    this.authService.logout();
  }
}
