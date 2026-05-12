import { Component } from '@angular/core';
import { ProductListComponent } from './features/product-list/product-list';

@Component({
  selector: 'app-root',
  imports: [ProductListComponent],
  template: `
    <main style="padding: 2rem;">
      <h1>Welcome to the No-ORM Store</h1>
      <app-product-list></app-product-list>
    </main>
  `
})
export class App { }
