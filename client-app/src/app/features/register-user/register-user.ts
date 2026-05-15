import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth-service';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register-user.html',
  styleUrl: './register-user.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterUser {
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    firstName: [''],
    lastName: ['']
  });

  get authLoading() {
    return this.authService.loading;
  }

  get authError() {
    return this.authService.error$;
  }

  async onSubmit() {
    if (this.form.invalid) return;

    try {
      await this.authService.register(this.form.value as any);
      this.router.navigate(['/products']);
    } catch (err) {
      console.error('Registration failed', err);
    }
  }
}
