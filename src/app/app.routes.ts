import { Routes } from '@angular/router';
import { LibrosPage } from './features/libros-page/libros-page';
import { HomePage } from './features/home-page/home-page';
import { ContactoPage } from './features/contacto-page/contacto-page';
import { LoginPage } from './features/login-page/login-page';
import { IniciarSesion } from './shared/iniciar-sesion/iniciar-sesion';
import { Registrarse } from './shared/registrarse/registrarse';

export const routes: Routes = [
    {path:'',component:HomePage},
    {path:'libros',component:LibrosPage},
    {path:'contacto',component:ContactoPage},
    {path:'login',component:LoginPage},
    {path:'iniciarSesion',component:IniciarSesion},
    {path:'registrarse',component:Registrarse}

];
