import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerCarListComponent } from './seller-car-list.component';

describe('SellerCarListComponent', () => {
  let component: SellerCarListComponent;
  let fixture: ComponentFixture<SellerCarListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerCarListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerCarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
