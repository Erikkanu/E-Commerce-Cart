import { Routes } from '@angular/router';
import { Login } from './features/login/login';
import { RegisterUser } from './features/register-user/register-user';
import { ProductListComponent } from './features/product-list/product-list';
import { CartComponent } from './features/cart/cart';
import { CheckoutComponent } from './features/checkout/checkout';

export const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'login', component: Login },
  { path: 'register', component: RegisterUser },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
];
