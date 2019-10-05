import { TestBed } from '@angular/core/testing';

import { ChamadosService } from './chamados.service';

describe('ChamadosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChamadosService = TestBed.get(ChamadosService);
    expect(service).toBeTruthy();
  });
});
