import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TipoChamado } from 'src/app/interfaces/tipo-chamado.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TipoChamadoService {

  private relativeLink = 'tipo-chamado'
  private url = `${environment.url.apirest}${this.relativeLink}`;

  constructor(
    private http: HttpClient
  ) { }

  getTipoChamado(parameters:any): Observable<TipoChamado> {
    return this.http.get(`${environment.url.apirest}/${this.relativeLink}?${parameters}`) as Observable<TipoChamado> ;
  }
}
