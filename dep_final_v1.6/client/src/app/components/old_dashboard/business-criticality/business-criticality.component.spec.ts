import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessCriticalityComponent } from './business-criticality.component';

describe('BusinessCriticalityComponent', () => {
  let component: BusinessCriticalityComponent;
  let fixture: ComponentFixture<BusinessCriticalityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessCriticalityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessCriticalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
