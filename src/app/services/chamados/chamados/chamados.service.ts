import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Pageable } from 'src/app/interfaces/pageable.model';
import { Chamados } from 'src/app/interfaces/chamados.model';

@Injectable({
  providedIn: 'root'
})

export class ChamadosService {

  private relativeLink = 'chamados';

  constructor(
    private http: HttpClient
  ) { }

  findChamados(parameters?: any): Observable<Pageable<Chamados>> {
    return this.http.get(`${environment.url.apirest}/${this.relativeLink}?${parameters}`) as Observable<Pageable<Chamados>>;
  }

  findById(id: Number): Observable<Chamados[]> {
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
