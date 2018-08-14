import { TestBed, inject } from '@angular/core/testing';

import { SellerCarService } from './seller-car.service';

describe('SellerCarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SellerCarService]
    });
  });

  it('should be created', inject([SellerCarService], (service: SellerCarService) => {
    expect(service).toBeTruthy();
  }));
});
