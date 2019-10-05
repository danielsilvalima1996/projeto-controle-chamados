import { TestBed } from '@angular/core/testing';

import { TipoChamadoService } from './tipo-chamado.service';

describe('TipoChamadoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoChamadoService = TestBed.get(TipoChamadoService);
    expect(service).toBeTruthy();
  });
});
