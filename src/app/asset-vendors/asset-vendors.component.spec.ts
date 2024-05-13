import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetVendorsComponent } from './asset-vendors.component';

describe('AssetVendorsComponent', () => {
  let component: AssetVendorsComponent;
  let fixture: ComponentFixture<AssetVendorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetVendorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetVendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
