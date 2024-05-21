import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomControllerButtonComponent } from './custom-controller-button.component';

describe('CustomControllerButtonComponent', () => {
  let component: CustomControllerButtonComponent;
  let fixture: ComponentFixture<CustomControllerButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomControllerButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomControllerButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
