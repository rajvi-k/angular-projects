import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiTypeComponent } from './ui-type.component';

describe('UiTypeComponent', () => {
  let component: UiTypeComponent;
  let fixture: ComponentFixture<UiTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
