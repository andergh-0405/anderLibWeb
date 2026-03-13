import { Component, inject, signal } from '@angular/core';
import { BooksService } from '../../service/books-service';
import { Libros } from '../../models/libros';

@Component({
  selector: 'app-catalogo',
  imports: [],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo {

  private servicioLibros = inject(BooksService);

  libros = signal<Libros[]>([]);

  ngOnInit(){
    this.verLibros();
  }

  verLibros(){
    this.servicioLibros.getBooks().subscribe(datos =>{
      this.libros.set(datos);
    })
  }

}
