import { TestBed } from '@angular/core/testing';

import { RolesListService } from './roles-list.service';

describe('RolesListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RolesListService = TestBed.get(RolesListService);
    expect(service).toBeTruthy();
  });
});
