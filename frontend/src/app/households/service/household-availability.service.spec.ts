import { TestBed } from '@angular/core/testing';

import { HouseholdsService } from './households.service';

describe('HouseholdAvailabilityService', () => {
  let service: HouseholdsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HouseholdsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
