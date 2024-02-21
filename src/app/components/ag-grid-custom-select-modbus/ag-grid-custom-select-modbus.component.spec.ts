import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridCustomSelectModbusComponent } from './ag-grid-custom-select-modbus.component';

describe('AgGridCustomSelectModbusComponent', () => {
  let component: AgGridCustomSelectModbusComponent;
  let fixture: ComponentFixture<AgGridCustomSelectModbusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgGridCustomSelectModbusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridCustomSelectModbusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
