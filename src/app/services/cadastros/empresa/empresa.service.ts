import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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

  private relativeLink = 'empresa';

  constructor(
    private http: HttpClient
  ) { }

  getEmpresa() {
    return this.http.get(`${environment.url.apirest}/${this.relativeLink}`);
  }

  
}
