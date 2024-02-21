import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridCustomSelectComponent } from './ag-grid-custom-select.component';

describe('AgGridCustomSelectComponent', () => {
  let component: AgGridCustomSelectComponent;
  let fixture: ComponentFixture<AgGridCustomSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgGridCustomSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridCustomSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
