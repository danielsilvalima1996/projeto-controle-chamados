import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
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

  getEmpresa(parameters: any): Observable<Pageable<Empresa>> {
    return this.http.get(`${environment.url.apirest}/${this.relativeLink}?${parameters}`) as Observable<Pageable<Empresa>>;
  }

  createEmpresa(obj: any) {
    return this.http.post(`${this.url}`, obj);
  }

  
}
