import { Component } from '@angular/core';
import { IniciarSesion } from "../../shared/iniciar-sesion/iniciar-sesion";

@Component({
  selector: 'app-login-page',
  imports: [IniciarSesion],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {}
