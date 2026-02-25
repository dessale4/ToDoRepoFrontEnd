import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(UserAuthService);
  const requiredRoles = route.data['roles'] as string[] | undefined;

  const userRoles = authService.getRoles();

  // Not logged in
  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  // Role check
  if (requiredRoles && !requiredRoles.some((r) => userRoles.includes(r))) {
    router.navigate(['/forbidden']);
    return false;
  }

  return true;
};
