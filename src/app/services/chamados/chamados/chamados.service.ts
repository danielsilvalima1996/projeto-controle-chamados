import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TipoChamado } from '../tipo-chamado/tipo-chamado.service';
import { SubtipoChamado } from '../subtipo-chamado/subtipo-chamado.service';
import { Empresa } from '../../cadastros/empresa/empresa.service';
import { Analista } from '../../cadastros/analista/analista.service';

export interface Chamados {
  idChamado: number,
  idEmpresa: Empresa,
  idAnalista: Analista,
  dataAbertura: Date,
  horaAbertura: string,
  dataFechamento: Date,
  horaFechamento: string,
  tempoChamado: string,
  codigoStatusChamado: number,
  tipoChamado: TipoChamado,
  subtipoChamado: SubtipoChamado,
  descricaoChamado: string,
  solucaoChamado: string,
}

@Injectable({
  providedIn: 'root'
})

export class ChamadosService {

  private relativeLink = 'chamados';

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<Chamados[]> {
    return this.http.get(`${environment.url.apirest}/${this.relativeLink}`) as Observable<Chamados[]>;
  }

  findById(id: number): Observable<Chamados[]> {
    return this.http.get(`${environment.url.apirest}/${this.relativeLink}/${id}`) as Observable<Chamados[]>;
  }

  createChamado(chamados: Chamados): Observable<Chamados> {
    return this.http.post(`${environment.url.apirest}/${this.relativeLink}`, chamados) as Observable<Chamados>;
  }

  alterChamado(chamados: Chamados): Observable<Chamados> {
    return this.http.put(`${environment.url.apirest}/${this.relativeLink}`, chamados) as Observable<Chamados>;
  }

  //implementar depois kk
  // deleteChamado(chamados: Chamados) {
  //   return this.http.delete(`${environment.url.apirest}/${this.relativeLink}`,
  //     {
  //       headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  //     })
  // }

}
