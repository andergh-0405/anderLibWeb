import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BooksService } from '../../service/books-service';
import { AuthService } from '../../service/auth-service';
import { Libros } from '../../models/libros';
import { CarritoService } from '../../service/carrito-service';

@Component({
  selector: 'app-catalogo',
  imports: [CommonModule],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo implements OnInit {

  private servicioLibros = inject(BooksService);
  private carritoService = inject(CarritoService);
  private authService = inject(AuthService);

  libros = signal<Libros[]>([]);
  busqueda = signal('');
  generoSeleccionado = signal('Todos');
  logueado = this.authService.sesionIniciada;

  libroAgregado = signal<string | null>(null);

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

  agregarAlCarrito(libro: Libros) {
    const agregado = this.carritoService.agregar(libro);
    if (agregado) {
      // ✅ Muestra feedback por 2 segundos
      this.libroAgregado.set(libro.id ?? null);
      setTimeout(() => this.libroAgregado.set(null), 2000);
    } else {
      alert(`"${libro.titulo}" ya está en tu carrito`);
    }
  }

  estaEnCarrito(libroId: string | undefined): boolean {
    return this.carritoService.carrito().some(l => l.id == libroId);
  }

  mensaje() {
    alert('Debes iniciar sesión para agregar al carrito');
  }
}