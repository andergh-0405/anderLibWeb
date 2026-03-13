import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Usuarios } from '../models/usuarios';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {

  private http = inject(HttpClient);
  private API_FIREBASE = 'https://anderlib-default-rtdb.firebaseio.com/';

  //Metodo get
  getUsuarios(): Observable<Usuarios[]> {
    return this.http.get <{ [key: string]: Usuarios }>(`${this.API_FIREBASE}/usuarios.json`).pipe(
      map(respuestaFirebase => {
        if (!respuestaFirebase) {
          return [];
        }
        return Object.keys(respuestaFirebase).map(id => {
          const usuarioConId = { ...respuestaFirebase[id], id: id };
          return usuarioConId;
        })
      })
    )
  }

  //Metodo post
  postUsuario(usuario: Usuarios):Observable<Usuarios> {
    return this.http.post<Usuarios>(`${this.API_FIREBASE}/usuarios.json`,usuario);
  }

  //Metodo PUT
  putUsuario(id:string, usuario:Usuarios):Observable<Usuarios> {
    return this.http.put<Usuarios>(`${this.API_FIREBASE}/usuarios/${id}.json`,usuario);
  }

  //Metodo delete}
  deleteUsuario(id:string):Observable<void> {
    return this.http.delete<void>(`${this.API_FIREBASE}/usuarios/${id}.json`);
  }

  //Usuario autenticado
  usuarioAutenticado: Usuarios | null = null;
  

}
