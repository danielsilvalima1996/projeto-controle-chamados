import { Injectable } from '@angular/core';
import { TipoChamado } from '../tipo-chamado/tipo-chamado.service';

export interface SubtipoChamado {
  id: number,
  descricao: string,
  created: Date,
  modified: Date,
  idTipoChamado: TipoChamado,
}

@Injectable({
  providedIn: 'root'
})
export class SubtipoChamadoService {

  constructor() { }
}
