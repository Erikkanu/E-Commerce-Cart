import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface User {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private user = signal<User | null>(null);
  private isLoading = signal(false);
  private error = signal<string | null>(null);

  readonly currentUser = this.user.asReadonly();
  readonly isAuthenticated = computed(() => this.user() !== null);
  readonly loading = this.isLoading.asReadonly();
  readonly error$ = this.error.asReadonly();

  async login(credentials: LoginRequest): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this.http
        .post<User>('/api/auth/login', credentials)
        .toPromise();
      if (response) {
        this.user.set(response);
      }
    } catch (err: any) {
      const errorMsg = err?.error?.message || 'Login failed. Please check your credentials.';
      this.error.set(errorMsg);
      throw err;
    } finally {
      this.isLoading.set(false);
    }
  }

  async register(data: RegisterRequest): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this.http
        .post<User>('/api/auth/register', data)
        .toPromise();
      if (response) {
        this.user.set(response);
      }
    } catch (err: any) {
      const errorMsg = err?.error?.message || 'Registration failed. Please try again.';
      this.error.set(errorMsg);
      throw err;
    } finally {
      this.isLoading.set(false);
    }
  }

  logout() {
    this.user.set(null);
    this.error.set(null);
  }

  setUser(user: User | null) {
    this.user.set(user);
  }
}
