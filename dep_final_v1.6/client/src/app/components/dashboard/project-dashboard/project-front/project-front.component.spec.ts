import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFrontComponent } from './project-front.component';

describe('ProjectFrontComponent', () => {
  let component: ProjectFrontComponent;
  let fixture: ComponentFixture<ProjectFrontComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectFrontComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
