import { TestBed } from '@angular/core/testing';

import { RegrasService } from './regras.service';

describe('RegrasService', () => {
  let service: RegrasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegrasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
