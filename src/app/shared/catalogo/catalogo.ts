import { Component, computed, inject, signal } from '@angular/core';
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
 
  libros   = signal<Libros[]>([]);
  busqueda = signal('');
  generoSeleccionado = signal('Todos');
 
  // Géneros únicos extraídos de los libros
  generos = computed(() => {
    const unicos = [...new Set(this.libros().map(l => l.genero))];
    return ['Todos', ...unicos];
  });
 
  // Libros filtrados por búsqueda + género
  librosFiltrados = computed(() => {
    const q = this.busqueda().toLowerCase().trim();
    const g = this.generoSeleccionado();
 
    return this.libros().filter(l => {
      const coincideBusqueda = !q ||
        l.titulo.toLowerCase().includes(q) ||
        l.autor.toLowerCase().includes(q);
 
      const coincideGenero = g === 'Todos' || l.genero === g;
 
      return coincideBusqueda && coincideGenero;
    });
  });
 
  ngOnInit(): void {
    this.servicioLibros.getBooks().subscribe(datos => this.libros.set(datos));
  }


}
