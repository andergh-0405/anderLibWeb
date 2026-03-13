import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitsHome } from './benefits-home';

describe('BenefitsHome', () => {
  let component: BenefitsHome;
  let fixture: ComponentFixture<BenefitsHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BenefitsHome],
    }).compileComponents();

    fixture = TestBed.createComponent(BenefitsHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
