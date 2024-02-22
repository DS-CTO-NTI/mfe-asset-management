import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridThumbnailComponent } from './ag-grid-thumbnail.component';

describe('AgGridThumbnailComponent', () => {
  let component: AgGridThumbnailComponent;
  let fixture: ComponentFixture<AgGridThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgGridThumbnailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
