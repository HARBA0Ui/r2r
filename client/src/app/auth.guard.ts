import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);

  let connected = localStorage.getItem('isAdmin') == 'true';
  if (connected) {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};
