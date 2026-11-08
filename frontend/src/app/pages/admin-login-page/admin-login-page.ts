import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AdminAuthService } from '../../services/admin-auth-service';

@Component({
  selector: 'admin-login-page',
  imports: [FormsModule, ButtonModule, InputTextModule],
  templateUrl: './admin-login-page.html',
  styleUrl: './admin-login-page.scss',
})
export class AdminLoginPage implements OnInit {
  private readonly adminAuth = inject(AdminAuthService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  email = '';
  password = '';
  errorMessage = '';
  submitting = false;

  async ngOnInit(): Promise<void> {
    if (this.route.snapshot.queryParamMap.get('authError') === 'verification') {
      this.errorMessage = 'Unable to verify your session. Please try signing in again.';
    }

    try {
      if (await this.adminAuth.isAdmin()) {
        await this.router.navigateByUrl(this.returnUrl);
      }
    } catch (error) {
      console.error('Unable to check the existing admin session:', error);
      this.errorMessage = 'Unable to verify your session. Please try signing in again.';
    }
  }

  async signIn(): Promise<void> {
    this.errorMessage = '';
    this.submitting = true;

    try {
      await this.adminAuth.signIn(this.email.trim(), this.password);
      await this.router.navigateByUrl(this.returnUrl);
    } catch (error) {
      console.error('Admin sign-in failed:', error);
      this.errorMessage =
        error instanceof Error ? error.message : 'Sign-in failed. Please try again.';
    } finally {
      this.submitting = false;
    }
  }

  private get returnUrl(): string {
    const url = this.route.snapshot.queryParamMap.get('returnUrl');
    return url?.startsWith('/') && !url.startsWith('//') ? url : '/create-product';
  }
}
