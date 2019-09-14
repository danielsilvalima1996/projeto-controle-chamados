import { TestBed } from '@angular/core/testing';

import { ChamadosInternosService } from './chamados-internos.service';

describe('ChamadosInternosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChamadosInternosService = TestBed.get(ChamadosInternosService);
    expect(service).toBeTruthy();
  });
});
