import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisLibros } from './mis-libros';

describe('MisLibros', () => {
  let component: MisLibros;
  let fixture: ComponentFixture<MisLibros>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisLibros],
    }).compileComponents();

    fixture = TestBed.createComponent(MisLibros);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
