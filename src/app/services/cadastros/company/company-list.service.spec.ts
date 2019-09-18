import { TestBed } from '@angular/core/testing';

import { CompanyListService } from './company-list.service';

describe('CompanyListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompanyListService = TestBed.get(CompanyListService);
    expect(service).toBeTruthy();
  });
});
