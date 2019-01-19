import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryCompletionComponent } from './category-completion.component';

describe('CategoryCompletionComponent', () => {
  let component: CategoryCompletionComponent;
  let fixture: ComponentFixture<CategoryCompletionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryCompletionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryCompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
