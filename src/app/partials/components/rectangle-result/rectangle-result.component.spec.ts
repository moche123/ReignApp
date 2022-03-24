import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RectangleResultComponent } from './rectangle-result.component';

describe('RectangleResultComponent', () => {
  let component: RectangleResultComponent;
  let fixture: ComponentFixture<RectangleResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RectangleResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RectangleResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
