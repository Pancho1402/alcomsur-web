import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownCompanyComponent } from './dropdown-company.component';

describe('DropdownCompanyComponent', () => {
  let component: DropdownCompanyComponent;
  let fixture: ComponentFixture<DropdownCompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownCompanyComponent]
    });
    fixture = TestBed.createComponent(DropdownCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
