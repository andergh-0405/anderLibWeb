import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrosPage } from './libros-page';

describe('LibrosPage', () => {
  let component: LibrosPage;
  let fixture: ComponentFixture<LibrosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibrosPage],
    }).compileComponents();

    fixture = TestBed.createComponent(LibrosPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
