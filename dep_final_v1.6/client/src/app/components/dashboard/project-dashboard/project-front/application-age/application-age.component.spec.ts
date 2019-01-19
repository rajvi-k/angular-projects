import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationAgeComponent } from './application-age.component';

describe('ApplicationAgeComponent', () => {
  let component: ApplicationAgeComponent;
  let fixture: ComponentFixture<ApplicationAgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationAgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationAgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
