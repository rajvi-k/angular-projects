import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProjectVersionComponent } from './view-project-version.component';

describe('ViewProjectVersionComponent', () => {
  let component: ViewProjectVersionComponent;
  let fixture: ComponentFixture<ViewProjectVersionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProjectVersionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProjectVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
