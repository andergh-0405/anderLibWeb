import { Component, inject, signal } from '@angular/core';
import { Libros } from '../../models/libros';
import { BooksService } from '../../service/books-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-home',
  imports: [CommonModule],
  templateUrl: './hero-home.html',
  styleUrl: './hero-home.css',
})
export class HeroHome {

  private servicioLibros = inject(BooksService);
  private libroId = 1; 


  libros = signal<Libros[]>([]);

  ngOnInit() {
    this.verlibroId();
  }


  verlibroId() {
    this.servicioLibros.getBook(this.libroId).subscribe(datos => {
      this.libros.set([datos]); 
    });
  }
}


