import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { UsuariosService } from '../../service/usuarios-service';
import { AuthService } from '../../service/auth-service';
import { Usuarios } from '../../models/usuarios';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, CommonModule],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {

  private servicioUsuarios = inject(UsuariosService);
  private servicioAuth = inject(AuthService);

  private router = inject(Router);

  //usuarioRol = this.servicioAuth.rolActual
  usuarioActual = (() => this.servicioUsuarios.usuarioAutenticado());

  menuUsuarioAbierto = false;
  menuMovilAbierto = false;
  cantidadCarrito = 0;

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
