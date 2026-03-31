import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisLibrosPage } from './mis-libros-page';

describe('MisLibrosPage', () => {
  let component: MisLibrosPage;
  let fixture: ComponentFixture<MisLibrosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisLibrosPage],
    }).compileComponents();

    fixture = TestBed.createComponent(MisLibrosPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
