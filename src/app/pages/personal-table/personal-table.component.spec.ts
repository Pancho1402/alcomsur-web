import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalTableComponent } from './personal-table.component';

describe('PersonalTableComponent', () => {
  let component: PersonalTableComponent;
  let fixture: ComponentFixture<PersonalTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalTableComponent]
    });
    fixture = TestBed.createComponent(PersonalTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
