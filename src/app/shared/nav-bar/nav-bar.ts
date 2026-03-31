import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { UsuariosService } from '../../service/usuarios-service';
import { AuthService } from '../../service/auth-service';
import { CarritoService } from '../../service/carrito-service';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive, CommonModule], 
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {

  private servicioUsuarios = inject(UsuariosService);
  private servicioAuth = inject(AuthService);
  private router = inject(Router);


  private carritoService = inject(CarritoService);

  cantidadCarrito = this.carritoService.cantidad;


  usuarioActual = computed(() => this.servicioUsuarios.usuarioAutenticado());



  menuUsuarioAbierto = false;
  menuMovilAbierto = false;

  toggleMenuUsuario(): void {
    this.menuUsuarioAbierto = !this.menuUsuarioAbierto;
    this.menuMovilAbierto = false;
  }

  toggleMenuMovil(): void {
    this.menuMovilAbierto = !this.menuMovilAbierto;
    this.menuUsuarioAbierto = false;
  }

  cerrarSesion(): void {
    this.servicioAuth.logout();
    this.menuUsuarioAbierto = false;
    this.menuMovilAbierto = false;
    this.router.navigate(['/libros']);
  }
}