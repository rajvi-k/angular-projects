import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppByProjectComponent } from './app-by-project.component';

describe('AppByProjectComponent', () => {
  let component: AppByProjectComponent;
  let fixture: ComponentFixture<AppByProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppByProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppByProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
