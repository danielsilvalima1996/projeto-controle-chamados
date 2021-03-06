import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubtipoChamado } from 'src/app/interfaces/subtipo-chamado.model';
import { Pageable } from 'src/app/interfaces/pageable.model';

@Injectable({
  providedIn: 'root'
})
export class SubtipoChamadoService {

  private relativeLink = 'subtipoChamado'
  private url = `${environment.url.apirest}/${this.relativeLink}`;

  constructor(
    private http: HttpClient
  ) { }

  findSubtipoChamado(parameters?: any): Observable<Array<SubtipoChamado>> {
    return this.http.get(`${this.url}?${parameters}`) as Observable<Array<SubtipoChamado>>;
  }

  findById(id: number): Observable<SubtipoChamado> {
    return this.http.get(`${this.url}/${id}`) as Observable<SubtipoChamado>;
  }

  createSubtipoChamado(subTipoChamado: any) {
    return this.http.post(`${this.url}`, subTipoChamado);
  }

  alterSubTipoChamado(subTipoChamado: any) {
    return this.http.put(`${this.url}`, subTipoChamado);
  }

  findAll(): Observable<SubtipoChamado[]> {
    return this.http.get(`${this.url}/active`) as Observable<SubtipoChamado[]>;
  }

  findAllByTipo(id: number): Observable<SubtipoChamado[]> {
    return this.http.get(`${this.url}/active/${id}`) as Observable<SubtipoChamado[]>;
  }

  verificaDescricao(descricao: string): Observable<boolean> {
    return this.http.get(`${this.url}/verificaDescricao/${descricao}`) as Observable<boolean>;
  }
}
