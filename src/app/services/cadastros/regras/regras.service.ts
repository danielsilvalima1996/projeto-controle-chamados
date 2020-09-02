import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Regras } from 'src/app/interfaces/regra.model';

@Injectable({
  providedIn: 'root'
})
export class RegrasService {

  private relativeLink = '/regra';
  private url = `${environment.url.apirest}${this.relativeLink}`;

  constructor(
    private http: HttpClient
  ) { }

  findAll(parameters?: any): Observable<Array<Regras>> {
     return this.http.get(`${this.url}?${parameters}`) as Observable<Array<Regras>>;
  }

  findById(id: number): Observable<Regras> {
    return this.http.get(`${this.url}/${id}`) as Observable<Regras>;
  }

  createRegras(Regras: Regras) {
    return this.http.post(`${this.url}`, Regras);
  }

  alterRegras(Regras: Regras) {
    return this.http.put(`${this.url}`, Regras);
  }
}
