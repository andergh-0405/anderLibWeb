import { ChangeDetectorRef, Component, computed, inject, signal } from '@angular/core';
import { BooksService } from '../../service/books-service';
import { UsuariosService } from '../../service/usuarios-service';
import { AuthService } from '../../service/auth-service';
import { Router } from '@angular/router';
import { Libros } from '../../models/libros';
import { Usuarios } from '../../models/usuarios';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-panel-admin',
  imports: [FormsModule],
  templateUrl: './panel-admin.html',
  styleUrl: './panel-admin.css',
})
export class PanelAdmin {

  private servicioLibros = inject(BooksService);
  private servicioUsuarios = inject(UsuariosService);
  private servicioAuth = inject(AuthService);
  private router = inject(Router);


  vistaActual: 'libros' | 'usuarios' = 'libros';

  busqueda = signal('');

  usuarioActual = this.servicioUsuarios.usuarioAutenticado;

  
  libros = signal<Libros[]>([]);
  usuarios = signal<Usuarios[]>([]);

  ngOnInit(): void {
    this.servicioLibros.getBooks().subscribe(data => this.libros.set(data));
    this.servicioUsuarios.getUsuarios().subscribe(data => this.usuarios.set(data));
  }

  librosFiltrados = computed(() => {
    const q = this.busqueda().toLowerCase();
    if (!q) return this.libros();
    return this.libros().filter(l =>
      l.titulo.toLowerCase().includes(q) ||
      l.autor.toLowerCase().includes(q) ||
      l.genero.toLowerCase().includes(q)
    );
  });

  usuariosFiltrados = computed(() => {
    const q = this.busqueda().toLowerCase();
    if (!q) return this.usuarios();
    return this.usuarios().filter(u =>
      u.nombre.toLowerCase().includes(q) ||
      u.correo.toLowerCase().includes(q)
    );
  });

 
  modalLibroAbierto = false;
  libroEditando: Libros | null = null;
  formLibro: Libros = this.libroVacio();

  libroVacio(): Libros {
    return { titulo: '', autor: '', genero: '', publicacion: '', anio: new Date().getFullYear(), imagen: '', precio: 0 };
  }

  abrirModalLibro(): void {
    this.libroEditando = null;
    this.formLibro = this.libroVacio();
    this.modalLibroAbierto = true;
  }

  editarLibro(libro: Libros): void {
    this.libroEditando = libro;
    this.formLibro = { ...libro };
    this.modalLibroAbierto = true;
  }

  cerrarModalLibro(): void {
    this.modalLibroAbierto = false;
    this.libroEditando = null;
  }

  guardarLibro(): void {
    if (this.libroEditando?.id) {
      this.servicioLibros.updateBook(this.libroEditando.id, this.formLibro).subscribe(() => {
        this.libros.update(lista =>
          lista.map(l => l.id === this.libroEditando!.id ? { ...this.formLibro, id: this.libroEditando!.id } : l)
        );
        this.cerrarModalLibro();
      });
    } else {
      this.servicioLibros.addBook(this.formLibro).subscribe(nuevo => {
        this.libros.update(lista => [...lista, nuevo]);
        this.cerrarModalLibro();
      });
    }
  }
 
  eliminarLibro(id: number): void {
    if (!confirm('¿Eliminar este libro?')) return;
    this.servicioLibros.deleteBook(id).subscribe(() => {
      this.libros.update(lista => lista.filter(l => l.id !== id));
    });
  }

  modalUsuarioAbierto = false;
  usuarioEditando: Usuarios | null = null;
  formUsuario: Usuarios = this.usuarioVacio();

  usuarioVacio(): Usuarios {
    return { nombre: '', correo: '', contrasena: '', foto: '', rol: 'ROLE_USUARIO' };
  }

  abrirModalUsuario(): void {
    this.usuarioEditando = null;
    this.formUsuario = this.usuarioVacio();
    this.modalUsuarioAbierto = true;
  }

  editarUsuario(usuario: Usuarios): void {
    this.usuarioEditando = usuario;
    this.formUsuario = { ...usuario };
    this.modalUsuarioAbierto = true;
  }

  cerrarModalUsuario(): void {
    this.modalUsuarioAbierto = false;
    this.usuarioEditando = null;
  }

  guardarUsuario(): void {
    if (this.usuarioEditando?.id) {
      this.servicioUsuarios.putUsuario(this.usuarioEditando.id, this.formUsuario).subscribe(() => {
        this.usuarios.update(lista =>
          lista.map(u => u.id === this.usuarioEditando!.id ? { ...this.formUsuario, id: this.usuarioEditando!.id } : u)
        );
        this.cerrarModalUsuario();
      });
    } else {
      this.servicioUsuarios.postUsuario(this.formUsuario).subscribe(nuevo => {
        this.usuarios.update(lista => [...lista, nuevo]);
        this.cerrarModalUsuario();
      });
    }
  }
 
  eliminarUsuario(id: string): void {
    if (!confirm('¿Eliminar este usuario?')) return;
    this.servicioUsuarios.deleteUsuario(id).subscribe(() => {
      this.usuarios.update(lista => lista.filter(u => u.id !== id));
    });
  }

  // ── Sesión ────────────────────────────────────────
  cerrarSesion(): void {
    this.servicioAuth.logout();
    this.router.navigate(['/']);
  }




}
