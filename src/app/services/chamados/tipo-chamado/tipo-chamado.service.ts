import { Injectable } from '@angular/core';

export interface TipoChamado {
  id: number,
  descricao: string,
  created: Date,
  modified: Date
}

@Injectable({
  providedIn: 'root'
})

export class TipoChamadoService {

  constructor() { }
}
