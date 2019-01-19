import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreCompletionComponent } from './score-completion.component';

describe('ScoreCompletionComponent', () => {
  let component: ScoreCompletionComponent;
  let fixture: ComponentFixture<ScoreCompletionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreCompletionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreCompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
