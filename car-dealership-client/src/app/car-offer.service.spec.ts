import { TestBed, inject } from '@angular/core/testing';

import { CarOfferService } from './car-offer.service';

describe('CarOfferService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarOfferService]
    });
  });

  it('should be created', inject([CarOfferService], (service: CarOfferService) => {
    expect(service).toBeTruthy();
  }));
});
