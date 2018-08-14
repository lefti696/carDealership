import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerCarDetailComponent } from './seller-car-detail.component';

describe('SellerCarDetailComponent', () => {
  let component: SellerCarDetailComponent;
  let fixture: ComponentFixture<SellerCarDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerCarDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerCarDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
