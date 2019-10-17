import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubtipoChamado } from 'src/app/interfaces/subtipo-chamado.model';
import { Pageable } from 'src/app/interfaces/pageable.model';

@Injectable({
  providedIn: 'root'
})
export class SubtipoChamadoService {

  private url = `${environment.url.apirest}/subtipo-chamado`;

  constructor(
    private http: HttpClient
  ) { }

  findSubtipoChamado(parameters: any): Observable<Pageable<SubtipoChamado>> {
    return this.http.get(`${this.url}?${parameters}`) as Observable<Pageable<SubtipoChamado>>;
  }

  findById(id: number): Observable<SubtipoChamado> {
    return this.http.get(`${this.url}/${id}`) as Observable<SubtipoChamado>;
  }

  createSubtipoChamado(subTipoChamado: any) {
    return this.http.post(`${this.url}`, subTipoChamado);
  }

  alterSubTipoChamado(subTipoChamado: SubtipoChamado) {
    return this.http.put(`${this.url}`, subTipoChamado);
  }
}
