import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Addatt4Component } from './addatt4.component';

describe('Addatt4Component', () => {
  let component: Addatt4Component;
  let fixture: ComponentFixture<Addatt4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Addatt4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Addatt4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
