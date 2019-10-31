import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { Pageable } from 'src/app/interfaces/pageable.model';
import { Analista } from 'src/app/interfaces/analista.model';

@Injectable({
  providedIn: 'root'
})

export class AnalistaService {

  private relativeLink = '/analista';
  private url = `${environment.url.apirest}${this.relativeLink}`;

  constructor(
    private http: HttpClient
  ) { }

  getAnalista(parameters?: any): Observable<Pageable<Analista>> {
    return this.http.get(`${this.url}?${parameters}`) as Observable<Pageable<Analista>>;
 }

  findById(id: number): Observable<Analista> {
    return this.http.get(`${this.url}/${id}`) as Observable<Analista>;
  }

  addAnalista(obj: any) {
    return this.http.post(`${this.url}`, obj);
  }

  alterAnalista(analista: Analista): Observable<Analista> {
    return this.http.put(`${this.url}`, analista) as Observable<Analista>;
  }

  findAllAtivo(): Observable<Analista[]> {
    return this.http.get(`${this.url}/ativo`) as Observable<Analista[]>;
  }

  totalAnalistas(): Observable<number> {
    return this.http.get(`${this.url}/total`) as Observable<number>;
  }

  verificaEmail(email: string): Observable<boolean> {
    return this.http.get(`${this.url}/verificaEmail/${email}`) as Observable<boolean>;
  }

  verificaMatricula(matricula: number): Observable<boolean> {
    return this.http.get(`${this.url}/verificaMatricula/${matricula}`) as Observable<boolean>;
  }

}
