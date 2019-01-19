import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryBubbleComponent } from './country-bubble.component';

describe('CountryBubbleComponent', () => {
  let component: CountryBubbleComponent;
  let fixture: ComponentFixture<CountryBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryBubbleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
