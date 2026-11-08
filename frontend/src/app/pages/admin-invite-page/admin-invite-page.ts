import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SupabaseService } from '../../services/supabase-service';

@Component({
  selector: 'admin-invite-page',
  imports: [FormsModule, ButtonModule, InputTextModule],
  templateUrl: './admin-invite-page.html',
  styleUrl: './admin-invite-page.scss',
})
export class AdminInvitePage implements OnInit {
  private readonly supabase = inject(SupabaseService).getClient();
  private readonly router = inject(Router);

  loading = true;
  submitting = false;
  isAdminInvite = false;
  password = '';
  confirmPassword = '';
  message = '';

  async ngOnInit(): Promise<void> {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    try {
      const callbackError = this.getCallbackError();
      if (callbackError) {
        this.message = `Supabase could not verify this invitation: ${callbackError}`;
        return;
      }

      const result = await Promise.race([
        this.supabase.auth.getSession(),
        new Promise<null>((resolve) => {
          timeoutId = setTimeout(() => resolve(null), 10000);
        }),
      ]);
      if (!result) {
        this.message =
          `Supabase did not finish verifying this invitation. Confirm the invite redirect is ` +
          `${window.location.origin}/admin-setup and that this URL is allowed in Supabase Auth settings. ` +
          'If the invite link has expired or was already used, ask an administrator to send a new one.';
        return;
      }

      const { data, error } = result;
      if (error) {
        throw error;
      }

      this.isAdminInvite = data.session?.user.app_metadata['role'] === 'admin';
      if (!data.session) {
        this.message =
          'This invite link is invalid or has expired. Ask an administrator to send a new invite.';
      } else if (!this.isAdminInvite) {
        this.message =
          'This account has not been granted administrator access. Contact an administrator.';
      }
    } catch (error) {
      console.error('Unable to verify the administrator invite:', error);
      this.message = 'Unable to verify this invite. Please try again or request a new invite.';
    } finally {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      this.loading = false;
    }
  }

  private getCallbackError(): string | null {
    const parameters = new URLSearchParams(window.location.search);
    const hashParameters = new URLSearchParams(window.location.hash.slice(1));
    const error = parameters.get('error_description') ?? hashParameters.get('error_description');
    const errorCode = parameters.get('error_code') ?? hashParameters.get('error_code');
    const errorName = parameters.get('error') ?? hashParameters.get('error');

    return error ?? errorCode ?? errorName;
  }

  async setPassword(): Promise<void> {
    this.message = '';
    if (this.submitting) {
      return;
    }
    if (this.password.length < 1) {
      this.message = 'Enter a password.';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.message = 'The passwords do not match.';
      return;
    }

    this.submitting = true;
    try {
      const { data, error } = await this.supabase.auth.updateUser({ password: this.password });
      if (error) {
        throw error;
      }
      if (data.user.app_metadata['role'] !== 'admin') {
        const { error: signOutError } = await this.supabase.auth.signOut();
        if (signOutError) {
          throw signOutError;
        }
        this.isAdminInvite = false;
        this.message = 'This account has not been granted administrator access. Contact an administrator.';
        return;
      }

      await this.router.navigateByUrl('/create-product');
    } catch (error) {
      console.error('Unable to set the administrator account password:', error);
      this.message =
        error instanceof Error ? error.message : 'Unable to set your password. Please try again.';
    } finally {
      this.submitting = false;
    }
  }
}
