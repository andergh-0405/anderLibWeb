import { inject, Injectable, signal } from '@angular/core';
import { UsuariosService } from './usuarios-service';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { CarritoService } from './carrito-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private servicioUsuario = inject(UsuariosService);
  private carritoService = inject(CarritoService);
  private router = inject(Router);

  sesionIniciada = signal<boolean>(localStorage.getItem('sesion') === 'true');
  rolActual = signal<string | null>(localStorage.getItem('rol'));

  login(correo: string, contrasena: string): Observable<boolean> {
    return this.servicioUsuario.getUsuarios().pipe(
      map(usuarios => {
        const usuario = usuarios.find(
          u => u.correo === correo && u.contrasena === contrasena
        );

        if (usuario) {
          localStorage.setItem('sesion', 'true');
          localStorage.setItem('rol', usuario.rol);
          this.sesionIniciada.set(true);
          this.rolActual.set(usuario.rol);
          this.servicioUsuario.setUsuario(usuario); 
          return true;
        }
        return false;
      })
    );
  }

  logout(): void {
    this.servicioUsuario.setUsuario(null); 
    this.carritoService.vaciar();        
    localStorage.removeItem('sesion');
    localStorage.removeItem('rol');
    this.sesionIniciada.set(false);
    this.rolActual.set(null);
    this.router.navigate(['/libros']);
  }
}