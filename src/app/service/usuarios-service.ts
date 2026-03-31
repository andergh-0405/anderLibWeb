import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, effect } from '@angular/core';
import { Compra, Usuarios } from '../models/usuarios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Libros } from '../models/libros';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private http = inject(HttpClient);
  private API_FIREBASE = 'https://anderlib-default-rtdb.firebaseio.com';
  
  
  usuarioAutenticado = signal<Usuarios | null>(
    JSON.parse(localStorage.getItem('usuario') || 'null')
  );

  setUsuario(usuario: Usuarios | null): void {
    this.usuarioAutenticado.set(usuario);
  }

  guardarCompra(items: Libros[]): void {
    const user = this.usuarioAutenticado();
    if (!user || !user.id) return;

    const nuevaCompra: Compra = {
      fecha: new Date().toLocaleDateString('es-EC'),
      total: items.reduce((acc, l) => acc + l.precio, 0) * 1.15,
      items: items
    };

    const comprasActuales = user.compras || [];
    const usuarioActualizado: Usuarios = {
      ...user,
      compras: [...comprasActuales, nuevaCompra]
    };

    const { id: _, ...sinId } = usuarioActualizado;
    this.http.put(`${this.API_FIREBASE}/usuarios/${user.id}.json`, sinId)
      .subscribe(() => {
        this.usuarioAutenticado.set(usuarioActualizado);
      });
  }

  getCompras(): Compra[] {
    return this.usuarioAutenticado()?.compras || [];
  }

  getUsuarios(): Observable<Usuarios[]> {
    return this.http.get<{ [key: string]: Usuarios }>(
      `${this.API_FIREBASE}/usuarios.json`
    ).pipe(
      map(resp => {
        if (!resp) return [];
        return Object.keys(resp).map(id => ({ ...resp[id], id }));
      })
    );
  }

  postUsuario(usuario: Usuarios): Observable<any> {
    return this.http.post(`${this.API_FIREBASE}/usuarios.json`, usuario);
  }

  putUsuario(id: string, usuario: Usuarios): Observable<any> {
    const { id: _, ...sinId } = usuario;
    return this.http.put(`${this.API_FIREBASE}/usuarios/${id}.json`, sinId);
  }

  deleteUsuario(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_FIREBASE}/usuarios/${id}.json`);
  }
}