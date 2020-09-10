import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Regra } from 'src/app/interfaces/regra.model';

@Injectable({
  providedIn: 'root'
})
export class RegrasService {

  private relativeLink = '/regra';
  private url = `${environment.url.apirest}${this.relativeLink}`;

  constructor(
    private http: HttpClient
  ) { }

  public findAll(parameters?: any): Observable<Array<Regra>> {
    return this.http.get(`${this.url}?${parameters}`) as Observable<Array<Regra>>;
  }

  public findById(id: number): Observable<Regra> {
    return this.http.get(`${this.url}/${id}`) as Observable<Regra>;
  }

  public createRegra(regra: Regra) {
    return this.http.post(`${this.url}`, regra);
  }

  public alterRegra(regra: Regra) {
    return this.http.put(`${this.url}`, regra);
  }
}
