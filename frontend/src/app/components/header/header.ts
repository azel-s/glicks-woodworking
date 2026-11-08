import { Component, DestroyRef, Injector, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  private readonly injector = inject(Injector);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly isAdmin = signal(false);
  readonly signingOut = signal(false);
  readonly signOutError = signal('');

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => void this.updateAdminStatus());

    void this.updateAdminStatus();
  }

  private async updateAdminStatus(): Promise<void> {
    const { AdminAuthService } = await import('../../services/admin-auth-service');
    const adminAuth = this.injector.get(AdminAuthService);

    try {
      this.isAdmin.set(await adminAuth.isAdmin());
    } catch (error) {
      console.error('Unable to verify admin navigation access:', error);
      this.isAdmin.set(false);
    }
  }

  closeAdminMenu(menu: HTMLDetailsElement): void {
    menu.open = false;
  }

  async signOut(menu: HTMLDetailsElement): Promise<void> {
    if (this.signingOut()) {
      return;
    }

    this.signOutError.set('');
    this.signingOut.set(true);
    try {
      const { AdminAuthService } = await import('../../services/admin-auth-service');
      await this.injector.get(AdminAuthService).signOut();
      this.isAdmin.set(false);
      this.closeAdminMenu(menu);
      await this.router.navigate(['/admin-login']);
    } catch (error) {
      console.error('Admin sign-out failed:', error);
      this.signOutError.set('Unable to sign out. Please try again.');
    } finally {
      this.signingOut.set(false);
    }
  }
}
