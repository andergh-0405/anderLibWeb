import { Injectable } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { Usuarios } from '../models/usuarios';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private usuarios: User | null = null;
  private auth = getAuth();

  //login firebase
  login(correo: string, contrasena: string) {
    //Metodo de firebase auth que permite iniciar sesion 
    signInWithEmailAndPassword(this.auth, correo, contrasena)
      //Ejecutar cuando inicia sesion correctamenete
      .then(usuarioAutenticado => {
        this.usuarios = usuarioAutenticado.user;
      })
      //Ejecutar cuando falla el inicio de sesion
      .catch(err =>
        console.log(err)
      );

  }

  logout() {
    signOut(this.auth);
    this.usuarios = null;
  }


}
