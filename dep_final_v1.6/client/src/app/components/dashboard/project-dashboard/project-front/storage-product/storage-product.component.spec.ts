import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageProductComponent } from './storage-product.component';

describe('StorageProductComponent', () => {
  let component: StorageProductComponent;
  let fixture: ComponentFixture<StorageProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorageProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
