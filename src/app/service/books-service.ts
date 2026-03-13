import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Libros } from '../models/libros';


@Injectable({
  providedIn: 'root',
})
export class BooksService {

  private http = inject(HttpClient);
  private API_BOOKS = 'https://69b0e631adac80b427c3552e.mockapi.io/libros/libros';

// Obtener todos los libros 
  getBooks(): Observable<Libros[]> {
    return this.http.get<Libros[]>(this.API_BOOKS);
  }
  
  // Obtener un libro por ID
  getBook(id: number | string): Observable<Libros> {
    return this.http.get<Libros>(`${this.API_BOOKS}/${id}`);
  }

  // Crear un nuevo libro
  addBook(book: Libros): Observable<Libros> {
    return this.http.post<Libros>(this.API_BOOKS, book);
  }

  // Actualizar un libro
  updateBook(id: number | string, book: Libros): Observable<Libros> {
    return this.http.put<Libros>(`${this.API_BOOKS}/${id}`, book);
  }

  // Eliminar un libro
  deleteBook(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.API_BOOKS}/${id}`);
  }

}
