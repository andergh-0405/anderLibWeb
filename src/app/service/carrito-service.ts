import { computed, effect, Injectable, signal } from '@angular/core';
import { Libros } from '../models/libros';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {


  private _carrito = signal<Libros[]>(this.cargarDesdeStorage());

  public carrito = this._carrito.asReadonly();
  public cantidad = computed(() => this._carrito().length);
  public subtotal = computed(() =>
    this._carrito().reduce((acc, item) => acc + item.precio, 0)
  );
  public iva = computed(() => this.subtotal() * 0.15);
  public total = computed(() => this.subtotal() + this.iva());

  constructor() {
    effect(() => {
      localStorage.setItem('carrito', JSON.stringify(this._carrito()));
    });
  }

  private cargarDesdeStorage(): Libros[] {
    try {
      const data = localStorage.getItem('carrito');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  agregar(libro: Libros): boolean {

    const existe = this._carrito().some(l => l.id == libro.id);
    if (existe) return false;

    this._carrito.update(carrito => [...carrito, libro]);
    return true;
  }

  quitar(libroId: string | undefined) {
    this._carrito.update(carrito => carrito.filter(l => l.id != libroId));
  }

  vaciar() {
    this._carrito.set([]);
    localStorage.removeItem('carrito');
  }

}
