import { inject, Injector } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = async (_route, state) => {
  const injector = inject(Injector);
  const router = inject(Router);
  const { AdminAuthService } = await import('./admin-auth-service');
  const adminAuth = injector.get(AdminAuthService);

  try {
    if (await adminAuth.isAdmin()) {
      return true;
    }
  } catch (error) {
    console.error('Unable to verify the admin session:', error);
    return router.createUrlTree(['/admin-login'], {
      queryParams: { returnUrl: state.url, authError: 'verification' },
    });
  }

  return router.createUrlTree(['/admin-login'], {
    queryParams: { returnUrl: state.url },
  });
};
