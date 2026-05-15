import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private readonly baseUrl = '/api';

  products = toSignal(this.http.get<Product[]>(`${this.baseUrl}/product`), { initialValue: [] });

  async get<T>(endpoint: string): Promise<T> {
    return this.http.get<T>(`${this.baseUrl}${endpoint}`).toPromise() as Promise<T>;
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, data).toPromise() as Promise<T>;
  }

  async put<T>(endpoint: string, data: unknown): Promise<T> {
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, data).toPromise() as Promise<T>;
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`).toPromise() as Promise<T>;
  }
}
