import { Component } from '@angular/core';
import { HeroHome } from "../../shared/hero-home/hero-home";
import { CarouselLibros } from "../../shared/carousel-libros/carousel-libros";
import { BenefitsHome } from "../../shared/benefits-home/benefits-home";

@Component({
  selector: 'app-home-page',
  imports: [HeroHome, CarouselLibros, BenefitsHome],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {}
