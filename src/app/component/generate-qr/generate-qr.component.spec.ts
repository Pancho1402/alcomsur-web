import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateQRComponent } from './generate-qr.component';

describe('GenerateQRComponent', () => {
  let component: GenerateQRComponent;
  let fixture: ComponentFixture<GenerateQRComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerateQRComponent]
    });
    fixture = TestBed.createComponent(GenerateQRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
