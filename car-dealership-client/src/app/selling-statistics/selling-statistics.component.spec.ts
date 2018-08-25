import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellingStatisticsComponent } from './selling-statistics.component';

describe('SellingStatisticsComponent', () => {
  let component: SellingStatisticsComponent;
  let fixture: ComponentFixture<SellingStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellingStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellingStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
