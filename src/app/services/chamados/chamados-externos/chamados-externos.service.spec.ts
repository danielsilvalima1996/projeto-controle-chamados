import { TestBed } from '@angular/core/testing';

import { ChamadosExternosService } from './chamados-externos.service';

describe('ChamadosExternosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChamadosExternosService = TestBed.get(ChamadosExternosService);
    expect(service).toBeTruthy();
  });
});
