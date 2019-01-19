import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberTilesComponent } from './number-tiles.component';

describe('NumberTilesComponent', () => {
  let component: NumberTilesComponent;
  let fixture: ComponentFixture<NumberTilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberTilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberTilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
