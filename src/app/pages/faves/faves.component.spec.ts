import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArrangedatePipe as  myCustomPipe } from 'src/app/pipes/arrangedate.pipe';

import { FavesComponent } from './faves.component';




describe('FavesComponent', () => {
  let component: FavesComponent;
  let fixture: ComponentFixture<FavesComponent>;

  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      declarations: [ FavesComponent,myCustomPipe ],
      providers: [myCustomPipe]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should show the favorites', () => {
    expect(component.resultSearch).toEqual([]);
  });





});
