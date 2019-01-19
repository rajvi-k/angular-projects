import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LtiOwnerComponent } from './lti-owner.component';

describe('LtiOwnerComponent', () => {
  let component: LtiOwnerComponent;
  let fixture: ComponentFixture<LtiOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LtiOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LtiOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
