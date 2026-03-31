import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UsuariosService } from '../../service/usuarios-service';
import { CarritoService } from '../../service/carrito-service';

@Component({
  selector: 'app-carrito',
  imports: [CommonModule, RouterLink],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class Carrito {

  private carritoService = inject(CarritoService);
  private usuariosService = inject(UsuariosService);

  carrito = this.carritoService.carrito;
  subtotal = this.carritoService.subtotal;
  iva = this.carritoService.iva;
  total = this.carritoService.total;

  eliminar(libroId: string | undefined) {
    this.carritoService.quitar(libroId);
  }

  procederAlPago() {
    if (this.carrito().length === 0) return;
    this.usuariosService.guardarCompra(this.carrito());
    this.carritoService.vaciar();
    alert('¡Compra confirmada! 📚 Gracias por tu compra en AnderLib.');
  }
}