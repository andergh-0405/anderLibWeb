import { Component, inject, signal } from '@angular/core';
import { UsuariosService } from '../../service/usuarios-service';
import { AuthService } from '../../service/auth-service';
import { Usuarios } from '../../models/usuarios';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrarse',
  imports: [FormsModule],
  templateUrl: './registrarse.html',
  styleUrl: './registrarse.css',
})
export class Registrarse {

  private servicioUsuarios = inject(UsuariosService);
  private router = inject(Router);

  //LISTA REACTIVA
  listaUsuarios = signal<Usuarios[]>([]);

  //Objeto para vincular con el formulario
  nuevoUsuario: Usuarios = {
    nombre: '',
    correo: '',
    contrasena: '',
    foto: '',
    rol: 'ROLE_USUARIO'
  }

  registrarUsuario() {
    this.servicioUsuarios.postUsuario(this.nuevoUsuario).subscribe(() => {
      alert('Usuario registrado correctamente');
      this.router.navigate(['/iniciarSesion'])
      this.limpiarFormulario();
      
    }, error => {
      alert('Error al registrar el usuario');
      console.error(error);
    });
  }


  limpiarFormulario() {
    this.nuevoUsuario = {
      nombre: '',
      correo: '',
      contrasena: '',
      foto: '',
      rol: 'ROLE_USUARIO'
    }
  }

}
