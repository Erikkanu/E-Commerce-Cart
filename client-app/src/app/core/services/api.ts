import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { Product } from '../models/product.model'; // Ensure this path is correct

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  // Using the port from your backend terminal
  private readonly baseUrl = 'https://localhost:7252/api';

  // toSignal perfectly bridges the gap between old Observables and new Signals
  // We provide an empty array [] as the initial value while it loads
  products = toSignal(this.http.get<Product[]>(`${this.baseUrl}/products`), { initialValue: [] });
}
