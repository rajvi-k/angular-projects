import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletionTileComponent } from './completion-tile.component';

describe('CompletionTileComponent', () => {
  let component: CompletionTileComponent;
  let fixture: ComponentFixture<CompletionTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletionTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletionTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
