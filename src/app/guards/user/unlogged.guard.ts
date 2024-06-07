import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { inject } from "@angular/core";

export const unloggedGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

  const loginService = inject(LoginService);

  // Call ping to update login status before checking
  loginService.ping();

  // Check login status using isLoggedIn subject after ping completes
  return !loginService.isLoggedIn.value;
};
