import { TestBed } from '@angular/core/testing';

import { PaginaService } from './pagina.service';

describe('PaginaService', () => {
  let service: PaginaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
