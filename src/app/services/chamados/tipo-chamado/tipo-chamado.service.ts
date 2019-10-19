import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TipoChamado } from 'src/app/interfaces/tipo-chamado.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TipoChamadoService {

  private relativeLink = 'tipo-chamado'
  private url = `${environment.url.apirest}/${this.relativeLink}`;

  constructor(
    private http: HttpClient
  ) { }

  getTipoChamado(parameters?:any): Observable<TipoChamado> {
    return this.http.get(`${this.url}?${parameters}`) as Observable<TipoChamado> ;
  }

  getTipoChamadoChumbado(){
    return of(
   [
     {
       "id": "1",
       "descricao": "SOFTWARE",
       "active": true,
       "created": "2019-09-14",
       "modified": "2019-09-14"
     },
     {
       "id": "2",
       "descricao": "HARDWARE",
       "active":true,
       "created": "2019-09-14",
       "modified": "2019-09-14"
     },
   ]
 )
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

  findAll(): Observable<TipoChamado[]> {
    return this.http.get(`${this.url}/active`) as Observable<TipoChamado[]>;
  }
}
