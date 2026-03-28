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
 
  librosFiltrados = computed(() => {
  const term = this.busqueda().toLowerCase();
  const gen = this.generoSeleccionado();
  
  return this.libros().filter(l => 
    (gen === 'Todos' || l.genero === gen) &&
    (l.titulo.toLowerCase().includes(term) || l.autor.toLowerCase().includes(term))
  );
});
 
  ngOnInit(): void {
    this.servicioLibros.getBooks().subscribe(datos => this.libros.set(datos));
  }


}
