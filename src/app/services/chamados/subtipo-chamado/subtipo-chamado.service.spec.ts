import { TestBed } from '@angular/core/testing';

import { SubtipoChamadoService } from './subtipo-chamado.service';

describe('SubtipoChamadoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubtipoChamadoService = TestBed.get(SubtipoChamadoService);
    expect(service).toBeTruthy();
  });
});
