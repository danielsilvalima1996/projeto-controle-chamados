import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { SubtipoChamado } from 'src/app/interfaces/subtipo-chamado.model';
import { Pageable } from 'src/app/interfaces/pageable.model';

@Injectable({
  providedIn: 'root'
})
export class SubtipoChamadoService {

  private relativeLink = 'subtipo-chamado'
  private url = `${environment.url.apirest}/${this.relativeLink}`;

  constructor(
    private http: HttpClient
  ) { }

  findSubtipoChamadoChumbado(){
    return of(
      [
        {
            "id": 1,
            "descricao": "TESTE 1",
            "created": "2019-10-22T23:08:13.000+0000",
            "modified": "2019-10-22T23:08:13.000+0000",
            "idTipoChamado": {
                "id": 1,
                "descricao": "TESTE 12",
                "created": "2019-10-22T23:05:53.000+0000",
                "modified": "2019-10-22T23:12:05.000+0000",
                "active": true
            },
            "active": true
        },
        {
            "id": 2,
            "descricao": "TESTE 2",
            "created": "2019-10-22T23:08:19.000+0000",
            "modified": "2019-10-22T23:08:19.000+0000",
            "idTipoChamado": {
                "id": 2,
                "descricao": "TESTE 2",
                "created": "2019-10-22T23:05:55.000+0000",
                "modified": "2019-10-22T23:05:55.000+0000",
                "active": true
            },
            "active": true
        },
        {
            "id": 3,
            "descricao": "TESTE 3",
            "created": "2019-10-22T23:08:38.000+0000",
            "modified": "2019-10-22T23:08:38.000+0000",
            "idTipoChamado": {
                "id": 3,
                "descricao": "TESTE 3",
                "created": "2019-10-22T23:06:00.000+0000",
                "modified": "2019-10-22T23:06:00.000+0000",
                "active": true
            },
            "active": true
        },
        {
            "id": 4,
            "descricao": "TESTE 4",
            "created": "2019-10-22T23:08:42.000+0000",
            "modified": "2019-10-22T23:08:42.000+0000",
            "idTipoChamado": {
                "id": 4,
                "descricao": "TESTE 4",
                "created": "2019-10-22T23:06:02.000+0000",
                "modified": "2019-10-22T23:06:02.000+0000",
                "active": true
            },
            "active": true
        },
        {
            "id": 5,
            "descricao": "TESTE 5",
            "created": "2019-10-22T23:08:47.000+0000",
            "modified": "2019-10-22T23:08:47.000+0000",
            "idTipoChamado": {
                "id": 5,
                "descricao": "TESTE 5",
                "created": "2019-10-22T23:06:04.000+0000",
                "modified": "2019-10-22T23:06:04.000+0000",
                "active": true
            },
            "active": true
        },
        {
            "id": 7,
            "descricao": "TESTE 222",
            "created": "2019-10-23T21:36:41.000+0000",
            "modified": "2019-10-23T21:36:41.000+0000",
            "idTipoChamado": {
                "id": 1,
                "descricao": "TESTE 12",
                "created": "2019-10-22T23:05:53.000+0000",
                "modified": "2019-10-22T23:12:05.000+0000",
                "active": true
            },
            "active": true
        },
        {
            "id": 8,
            "descricao": "subtipo chaamdo 222",
            "created": "2019-10-23T21:55:22.000+0000",
            "modified": "2019-10-23T21:55:22.000+0000",
            "idTipoChamado": {
                "id": 1,
                "descricao": "TESTE 12",
                "created": "2019-10-22T23:05:53.000+0000",
                "modified": "2019-10-22T23:12:05.000+0000",
                "active": true
            },
            "active": true
        }
    ]    
    
    )
  }

  findSubtipoChamado(parameters?: any): Observable<SubtipoChamado> {
    return this.http.get(`${this.url}?${parameters}`) as Observable<SubtipoChamado>;
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
}
