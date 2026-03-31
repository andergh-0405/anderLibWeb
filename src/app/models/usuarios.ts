import { Libros } from "./libros";

export interface Usuarios {
  id?: string;
  nombre: string;
  correo: string;
  contrasena: string;
  foto: string;
  rol: 'ROLE_ADMIN' | 'ROLE_USUARIO';
  compras?: Compra[];  
}

export interface Compra {
  fecha: string;        
  total: number;
  items: Libros[];
}