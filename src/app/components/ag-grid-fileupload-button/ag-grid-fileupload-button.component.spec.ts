import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridFileuploadButtonComponent } from './ag-grid-fileupload-button.component';

describe('AgGridFileuploadButtonComponent', () => {
  let component: AgGridFileuploadButtonComponent;
  let fixture: ComponentFixture<AgGridFileuploadButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgGridFileuploadButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridFileuploadButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
