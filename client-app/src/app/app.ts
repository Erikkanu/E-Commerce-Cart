import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from './features/product-list/product-list';
import { HeaderComponent } from './core/layout/header';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet, ProductListComponent],
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `,
  styles: `
    :host {
      display: block;
      min-height: 100vh;
    }
  `
})
export class App { }

