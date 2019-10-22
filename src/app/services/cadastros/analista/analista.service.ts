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

  getAnalistaChumbado(){
        return of(
      [
        {
          "id": '1',
          "nome": "Gustavo",
          "email": "gustavo@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '2',
          "nome": "Vitor",
          "email": "vitor@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '3',
          "nome": "Saulo",
          "email": "saulo@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '4',
          "nome": "Carlos",
          "email": "carlos@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '5',
          "nome": "Aline",
          "email": "aline@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": false
        },
        {
          "id": '6',
          "nome": "Winston",
          "email": "winston@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '1',
          "nome": "Gustavo",
          "email": "gustavo@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '2',
          "nome": "Vitor",
          "email": "vitor@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '3',
          "nome": "Saulo",
          "email": "saulo@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '4',
          "nome": "Carlos",
          "email": "carlos@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '5',
          "nome": "Aline",
          "email": "aline@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": false
        },
        {
          "id": '6',
          "nome": "Winston",
          "email": "winston@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },{
          "id": '1',
          "nome": "Gustavo",
          "email": "gustavo@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '2',
          "nome": "Vitor",
          "email": "vitor@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '3',
          "nome": "Saulo",
          "email": "saulo@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '4',
          "nome": "Carlos",
          "email": "carlos@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '5',
          "nome": "Aline",
          "email": "aline@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": false
        },
        {
          "id": '6',
          "nome": "Winston",
          "email": "winston@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },{
          "id": '1',
          "nome": "Gustavo",
          "email": "gustavo@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '2',
          "nome": "Vitor",
          "email": "vitor@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '3',
          "nome": "Saulo",
          "email": "saulo@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '4',
          "nome": "Carlos",
          "email": "carlos@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '5',
          "nome": "Aline",
          "email": "aline@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": false
        },
        {
          "id": '6',
          "nome": "Winston",
          "email": "winston@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },{
          "id": '1',
          "nome": "Gustavo",
          "email": "gustavo@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '2',
          "nome": "Vitor",
          "email": "vitor@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '3',
          "nome": "Saulo",
          "email": "saulo@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '4',
          "nome": "Carlos",
          "email": "carlos@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '5',
          "nome": "Aline",
          "email": "aline@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": false
        },
        {
          "id": '6',
          "nome": "Winston",
          "email": "winston@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },{
          "id": '1',
          "nome": "Gustavo",
          "email": "gustavo@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '2',
          "nome": "Vitor",
          "email": "vitor@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '3',
          "nome": "Saulo",
          "email": "saulo@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '4',
          "nome": "Carlos",
          "email": "carlos@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '5',
          "nome": "Aline",
          "email": "aline@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": false
        },
        {
          "id": '6',
          "nome": "Winston",
          "email": "winston@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },{
          "id": '1',
          "nome": "Gustavo",
          "email": "gustavo@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '2',
          "nome": "Vitor",
          "email": "vitor@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '3',
          "nome": "Saulo",
          "email": "saulo@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '4',
          "nome": "Carlos",
          "email": "carlos@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '5',
          "nome": "Aline",
          "email": "aline@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": false
        },
        {
          "id": '6',
          "nome": "Winston",
          "email": "winston@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },{
          "id": '1',
          "nome": "Gustavo",
          "email": "gustavo@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '2',
          "nome": "Vitor",
          "email": "vitor@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '3',
          "nome": "Saulo",
          "email": "saulo@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '4',
          "nome": "Carlos",
          "email": "carlos@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '5',
          "nome": "Aline",
          "email": "aline@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": false
        },
        {
          "id": '6',
          "nome": "Winston",
          "email": "winston@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },{
          "id": '1',
          "nome": "Gustavo",
          "email": "gustavo@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '2',
          "nome": "Vitor",
          "email": "vitor@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '3',
          "nome": "Saulo",
          "email": "saulo@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '4',
          "nome": "Carlos",
          "email": "carlos@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '5',
          "nome": "Aline",
          "email": "aline@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": false
        },
        {
          "id": '6',
          "nome": "Winston",
          "email": "winston@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },{
          "id": '1',
          "nome": "Gustavo",
          "email": "gustavo@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '2',
          "nome": "Vitor",
          "email": "vitor@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '3',
          "nome": "Saulo",
          "email": "saulo@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '4',
          "nome": "Carlos",
          "email": "carlos@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '5',
          "nome": "Aline",
          "email": "aline@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": false
        },
        {
          "id": '6',
          "nome": "Winston",
          "email": "winston@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },{
          "id": '1',
          "nome": "Gustavo",
          "email": "gustavo@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '2',
          "nome": "Vitor",
          "email": "vitor@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '3',
          "nome": "Saulo",
          "email": "saulo@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '4',
          "nome": "Carlos",
          "email": "carlos@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '5',
          "nome": "Aline",
          "email": "aline@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": false
        },
        {
          "id": '6',
          "nome": "Winston",
          "email": "winston@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },{
          "id": '1',
          "nome": "Gustavo",
          "email": "gustavo@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '2',
          "nome": "Vitor",
          "email": "vitor@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '3',
          "nome": "Saulo",
          "email": "saulo@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '4',
          "nome": "Carlos",
          "email": "carlos@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '5',
          "nome": "Aline",
          "email": "aline@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": false
        },
        {
          "id": '6',
          "nome": "Winston",
          "email": "winston@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },{
          "id": '1',
          "nome": "Gustavo",
          "email": "gustavo@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '2',
          "nome": "Vitor",
          "email": "vitor@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '3',
          "nome": "Saulo",
          "email": "saulo@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '4',
          "nome": "Carlos",
          "email": "carlos@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        },
        {
          "id": '5',
          "nome": "Aline",
          "email": "aline@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": false
        },
        {
          "id": '6',
          "nome": "Winston",
          "email": "winston@lobios.com.br",
          "matricula":"5",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "active": true
        }

      ]
    )
  }

  findById(id: number): Observable<Analista> {
    return this.http.get(`${this.url}/${id}`) as Observable<Analista>;
  }

  addAnalista(obj: any) {
    return this.http.post(`${this.url}`, obj);
  }

  alterAnalista(analista: Analista) {
    return this.http.put(`${this.url}`, analista);
  }

}
