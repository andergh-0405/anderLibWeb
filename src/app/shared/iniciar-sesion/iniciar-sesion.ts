import { Component, inject } from '@angular/core';
import { AuthService } from '../../service/auth-service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iniciar-sesion',
  imports: [FormsModule],
  templateUrl: './iniciar-sesion.html',
  styleUrl: './iniciar-sesion.css',
})
export class IniciarSesion {

  correo: string = '';
  contrasena: string = '';
  mostrarPassword: boolean = false; 

  private servicioAuth = inject(AuthService);
  private router = inject(Router);

  iniciarSesion() {
    this.servicioAuth.login(this.correo,this.contrasena).subscribe(success =>{
      if(success){
        alert('Bienvenido al Sistema');
        this.router.navigate(['/']);
      }else{
        alert('Correo o contraseña incorecta')
      }
    })
  }


}
