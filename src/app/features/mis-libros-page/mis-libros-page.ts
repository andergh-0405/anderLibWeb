import { Component } from '@angular/core';
import { MisLibros } from "../../shared/mis-libros/mis-libros";

@Component({
  selector: 'app-mis-libros-page',
  imports: [MisLibros],
  templateUrl: './mis-libros-page.html',
  styleUrl: './mis-libros-page.css',
})
export class MisLibrosPage {}
