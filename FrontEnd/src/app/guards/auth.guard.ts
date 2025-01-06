import { AuthService } from './../service/auth.service';
import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.isLoggedIn()) return true;
  console.log("teste");

  authService.logout();
  router.navigate(['user/login']);
  return false;
};
