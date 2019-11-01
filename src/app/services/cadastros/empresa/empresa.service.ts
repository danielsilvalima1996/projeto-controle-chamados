import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { Pageable } from 'src/app/interfaces/pageable.model';
import { Empresa } from 'src/app/interfaces/empresa.model';

@Injectable({
  providedIn: 'root'
})

export class EmpresaService {

  private relativeLink = 'empresa';
  private url = `${environment.url.apirest}/${this.relativeLink}`;

  constructor(
    private http: HttpClient
  ) { }

  getEmpresa(parameters?: any): Observable<Pageable<Empresa>> {
    return this.http.get(`${environment.url.apirest}/${this.relativeLink}?${parameters}`) as Observable<Pageable<Empresa>>;
  }

  createEmpresa(obj: any) {
    return this.http.post(`${this.url}`, obj);
  }

  findById(id: number): Observable<Empresa> {
    return this.http.get(`${this.url}/${id}`) as Observable<Empresa>;
  }

  alterEmpresa(empresa: Empresa) {
    return this.http.put(`${this.url}`,empresa);
  }

  findAllAtivo(): Observable<Empresa[]> {
    return this.http.get(`${this.url}/ativo`) as Observable<Empresa[]>;
  }

  verificaCnpj(cnpj: string): Observable<boolean> {
    return this.http.get(`${this.url}/verificaCnpj/${cnpj}`) as Observable<boolean>;
  }

  verificaCodigoTotvs(codigoTotvs: string): Observable<boolean> {
    return this.http.get(`${this.url}/verificaCodigoTotvs/${codigoTotvs}`) as Observable<boolean>;
  }
  
}
