import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryUsageComponent } from './country-usage.component';

describe('CountryUsageComponent', () => {
  let component: CountryUsageComponent;
  let fixture: ComponentFixture<CountryUsageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryUsageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
