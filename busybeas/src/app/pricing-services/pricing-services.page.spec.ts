import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingServicesPage } from './pricing-services.page';

describe('PricingServicesPage', () => {
  let component: PricingServicesPage;
  let fixture: ComponentFixture<PricingServicesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingServicesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingServicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
