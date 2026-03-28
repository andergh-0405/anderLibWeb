import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { UsuariosService } from '../service/usuarios-service';
import { AuthService } from '../service/auth-service';

export const canMatchGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.rolActual() === 'ROLE_ADMIN') {
    return true;
  }
  router.navigate(['/dashboard']); 
  return false;

};
