import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export interface TipoChamado {
  id: number,
  descricao: string,
  created: Date,
  modified: Date
}
export class TipoChamadoService {

  constructor() { }
}
