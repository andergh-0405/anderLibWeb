import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UsuariosService } from '../../service/usuarios-service';

@Component({
  selector: 'app-mis-libros',
  imports: [CommonModule, RouterLink],
  templateUrl: './mis-libros.html',
  styleUrl: './mis-libros.css',
})
export class MisLibros {

  private usuariosService = inject(UsuariosService);

  compras = computed(() => this.usuariosService.usuarioAutenticado()?.compras || []);

  totalLibros = computed(() =>
    this.compras().reduce((acc, compra) => acc + compra.items.length, 0)
  );
}