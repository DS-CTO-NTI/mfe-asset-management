import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MfeHomeComponent } from './mfe-home.component';

describe('MfeHomeComponent', () => {
  let component: MfeHomeComponent;
  let fixture: ComponentFixture<MfeHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MfeHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MfeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
