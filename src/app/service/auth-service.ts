import { inject, Injectable, signal } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { Usuarios } from '../models/usuarios';
import { firebaseConfig } from '../config/firebase.config';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { Router } from '@angular/router';
import { UsuariosService } from './usuarios-service';
import { map, Observable } from 'rxjs';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private servicioUsuario = inject(UsuariosService);
  sesionIniciada = signal<boolean | null>(localStorage.getItem('sesion') === 'true');
  public rolActual = signal<string | null>(localStorage.getItem('rol'));



  login(correo: string, contrasena: string): Observable<boolean> {
    return this.servicioUsuario.getUsuarios().pipe(
      map(usuarios => {
        const usuarioCoincide = usuarios.find(u => u.correo === correo &&
          u.contrasena === contrasena);
        if (usuarioCoincide) {
          localStorage.setItem('sesion', 'true');
          localStorage.setItem('usuario', JSON.stringify(usuarioCoincide));
          localStorage.setItem('rol', usuarioCoincide.rol);
          this.rolActual.set(usuarioCoincide.rol);
          this.servicioUsuario.verUsuarioAutenticado(usuarioCoincide);
          this.sesionIniciada.set(true);

          return true;
        }
        return false;
      })
    )
  }

  logout() {
    localStorage.removeItem('sesion');
    localStorage.removeItem('usuario');
    this.sesionIniciada.set(false);
    localStorage.removeItem('rol');
    this.rolActual.set(null);
    this.servicioUsuario.verUsuarioAutenticado(null);
  }
}