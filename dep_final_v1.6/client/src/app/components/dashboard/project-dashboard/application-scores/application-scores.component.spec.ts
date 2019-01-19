import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationScoresComponent } from './application-scores.component';

describe('ApplicationScoresComponent', () => {
  let component: ApplicationScoresComponent;
  let fixture: ComponentFixture<ApplicationScoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationScoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
