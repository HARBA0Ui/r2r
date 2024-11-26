import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);

  let connected = localStorage.getItem('isLoggedIn') == 'true';
  if (connected) {
    router.navigate(['/home']);
    return false;
  } else {
    return true;
  }
};
