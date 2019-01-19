import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemInterfaceComponent } from './system-interface.component';

describe('SystemInterfaceComponent', () => {
  let component: SystemInterfaceComponent;
  let fixture: ComponentFixture<SystemInterfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemInterfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
