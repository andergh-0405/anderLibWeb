import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { UsuariosService } from '../../service/usuarios-service';
import { AuthService } from '../../service/auth-service';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink,CommonModule],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {


  public authServicio = inject(AuthService);

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
    
    this.menuUsuarioAbierto = false;
  }
}
