import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { UsuariosService } from '../service/usuarios-service';

export const canMatchGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  
  const usuarioService = inject(UsuariosService);
  const usuario = JSON.parse(localStorage.getItem('usuario')!);
   
  const router = inject(Router);

  if (usuario.rol === 'ROLE_ADMIN') {
    return router.parseUrl('/dasboard');
  }else if(usuario.rol === 'ROLE_USUARIO'){
    return router.parseUrl('/libros');
  }else{
    return router.parseUrl('/');
  }

};
