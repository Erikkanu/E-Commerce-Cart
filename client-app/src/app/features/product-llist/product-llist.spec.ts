import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductLlist } from './product-llist';

describe('ProductLlist', () => {
  let component: ProductLlist;
  let fixture: ComponentFixture<ProductLlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductLlist],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductLlist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
