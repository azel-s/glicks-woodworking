import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase-service';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {
  private readonly supabaseService = inject(SupabaseService);

  async signIn(email: string, password: string): Promise<void> {
    const auth = this.supabaseService.getClient().auth;
    const { data, error } = await auth.signInWithPassword({ email, password });
    if (error) {
      throw error;
    }

    if (data.user.app_metadata['role'] !== 'admin') {
      const { error: signOutError } = await auth.signOut();
      if (signOutError) {
        throw signOutError;
      }

      throw new Error('This account is not authorized to access admin tools.');
    }
  }

  async isAdmin(): Promise<boolean> {
    const { data, error } = await this.supabaseService.getClient().auth.getSession();
    if (error) {
      throw error;
    }

    return data.session?.user.app_metadata['role'] === 'admin';
  }

  async signOut(): Promise<void> {
    const { error } = await this.supabaseService.getClient().auth.signOut();
    if (error) {
      throw error;
    }
  }
}
