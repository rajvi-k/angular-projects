import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiBarChartComponent } from './ui-bar-chart.component';

describe('UiBarChartComponent', () => {
  let component: UiBarChartComponent;
  let fixture: ComponentFixture<UiBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
