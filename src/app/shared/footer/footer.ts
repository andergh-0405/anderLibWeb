import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth-service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {

  anio(){
    return new Date().getFullYear();  
  }

  private servicioAuth = inject(AuthService);

  // Método para verificar si el usuario está autenticado
  usuarioAutenticado(): boolean {
    return this.servicioAuth.sesionIniciada();
  }

}
