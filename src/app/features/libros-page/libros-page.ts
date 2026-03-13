import { Component } from '@angular/core';
import { Catalogo } from "../../shared/catalogo/catalogo";

@Component({
  selector: 'app-libros-page',
  imports: [Catalogo],
  templateUrl: './libros-page.html',
  styleUrl: './libros-page.css',
})
export class LibrosPage {}
