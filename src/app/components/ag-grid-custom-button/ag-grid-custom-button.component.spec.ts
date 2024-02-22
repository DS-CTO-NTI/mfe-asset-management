import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridCustomButtonComponent } from './ag-grid-custom-button.component';

describe('AgGridCustomButtonComponent', () => {
  let component: AgGridCustomButtonComponent;
  let fixture: ComponentFixture<AgGridCustomButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgGridCustomButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridCustomButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
