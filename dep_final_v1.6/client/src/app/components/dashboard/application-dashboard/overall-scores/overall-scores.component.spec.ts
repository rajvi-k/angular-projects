import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallScoresComponent } from './overall-scores.component';

describe('OverallScoresComponent', () => {
  let component: OverallScoresComponent;
  let fixture: ComponentFixture<OverallScoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverallScoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
