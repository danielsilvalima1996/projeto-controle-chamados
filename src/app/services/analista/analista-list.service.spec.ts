import { TestBed } from '@angular/core/testing';

import { AnalistaListService } from './analista-list.service';

describe('AnalistaListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnalistaListService = TestBed.get(AnalistaListService);
    expect(service).toBeTruthy();
  });
});
