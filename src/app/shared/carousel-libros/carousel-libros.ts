import { Component, inject, signal } from '@angular/core';
import { Libros } from '../../models/libros';
import { BooksService } from '../../service/books-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel-libros',
  imports: [CommonModule],
  templateUrl: './carousel-libros.html',
  styleUrl: './carousel-libros.css',
})
export class CarouselLibros {

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
