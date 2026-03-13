import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselLibros } from './carousel-libros';

describe('CarouselLibros', () => {
  let component: CarouselLibros;
  let fixture: ComponentFixture<CarouselLibros>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselLibros],
    }).compileComponents();

    fixture = TestBed.createComponent(CarouselLibros);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
