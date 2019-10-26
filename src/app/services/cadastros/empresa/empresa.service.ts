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

  // getEmpresaChumbado(){
  //   return of(
  //     [
  //       {
  //         "id": "1",
  //         "razaoSocial": "Fulano de Tal SA",
  //         "active": true,
  //         "created": "2019-09-14",
  //         "modified": "2019-09-14"
  //       },
  //       {
  //         "id": "2",
  //         "razaoSocial": "João das Couves Ltda",
  //         "active":true,
  //         "created": "2019-09-14",
  //         "modified": "2019-09-14"
  //       },
  //     ]
  //   ) 
  // }

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
  
}
