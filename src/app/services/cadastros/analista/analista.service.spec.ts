import { TestBed } from '@angular/core/testing';

import { AnalistaService } from './analista.service';

describe('AnalistaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnalistaService = TestBed.get(AnalistaService);
    expect(service).toBeTruthy();
  });
});
