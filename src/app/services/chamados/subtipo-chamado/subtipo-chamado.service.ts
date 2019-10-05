import { Injectable } from '@angular/core';
import { TipoChamado } from '../tipo-chamado/tipo-chamado.service';

@Injectable({
  providedIn: 'root'
})

export interface SubtipoChamado {
    id: number,
    descricao: string,
    created: Date,
    modified: Date,
    idTipoChamado: TipoChamado,
}
export class SubtipoChamadoService {

  constructor() { }
}
