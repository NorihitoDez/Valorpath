import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
//snp_spcf mmt
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';
//snp_spcf mmt

export const seguridadGuard = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const lService = inject(LoginService); //es un inject de Angular q va de la mano con el  login.service
  const router = inject(Router);
  const rpta = lService.verificar(); //se inyecta lo q e s lservice
  if (!rpta) {
    router.navigate(['/login']);
    return false;
  }
  return rpta;
};
