import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TipoChamado } from 'src/app/interfaces/tipo-chamado.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TipoChamadoService {

  private relativeLink = 'tipoChamado'
  private url = `${environment.url.apirest}/${this.relativeLink}`;

  constructor(
    private http: HttpClient
  ) { }

  findAll(parameters?:any): Observable<Array<TipoChamado>> {
    return this.http.get(`${this.url}?${parameters}`) as Observable<Array<TipoChamado>> ;
  }

  createTipoChamado(tipoChamado: any) {
    return this.http.post(`${this.url}`, tipoChamado);
  }

  alterTipoChamado(TipoChamado: TipoChamado) {
    return this.http.put(`${this.url}`, TipoChamado);
  }

  findById(id: number): Observable<TipoChamado> {
    return this.http.get(`${this.url}/${id}`) as Observable<TipoChamado>;
  }

  // verificaDescricao(descricao: string): Observable<boolean> {
  //   return this.http.get(`${this.url}/verificaDescricao/${descricao}`) as Observable<boolean>;
  // }
}
