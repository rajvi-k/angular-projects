import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighestScoredComponent } from './highest-scored.component';

describe('HighestScoredComponent', () => {
  let component: HighestScoredComponent;
  let fixture: ComponentFixture<HighestScoredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighestScoredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighestScoredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
