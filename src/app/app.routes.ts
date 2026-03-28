import { Routes } from '@angular/router';
import { LibrosPage } from './features/libros-page/libros-page';
import { HomePage } from './features/home-page/home-page';
import { ContactoPage } from './features/contacto-page/contacto-page';
import { LoginPage } from './features/login-page/login-page';
import { IniciarSesion } from './shared/iniciar-sesion/iniciar-sesion';
import { Registrarse } from './shared/registrarse/registrarse';
import { PanelAdmin } from './shared/panel-admin/panel-admin';
import { canActiveGuard } from './guards/can-active-guard';
import { canMatchGuard } from './guards/can-match-guard';

export const routes: Routes = [
    {path:'',component:HomePage},
    {path:'libros',component:LibrosPage},
    {path:'contacto',component:ContactoPage},
    {path:'login',component:LoginPage,canActivate:[canActiveGuard]},
    {path:'iniciarSesion',component:IniciarSesion},
    {path:'registrarse',component:Registrarse},
    {path:'dashboard',component:PanelAdmin,canMatch:[canMatchGuard]}

];
