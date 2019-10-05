import { Injectable } from '@angular/core';

export interface Empresa {
  id: number,
  ativo: boolean,
  cnpj: string,
  razaoSocial: string,
  nomeFantasia: string,
  endereco: string,
  codigoTotvs: string,
  admin: string,
  telefone: string,
  criado: Date,
  modificado: Date
}

@Injectable({
  providedIn: 'root'
})

export class EmpresaService {

  constructor() { }
}
