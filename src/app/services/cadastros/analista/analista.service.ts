import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

export interface Analista {
  id: number,
  email: string,
  nome: string,
  matricula: number,
  ativo: boolean,
  criado: Date,
  modificado: Date
}
@Injectable({
  providedIn: 'root'
})

export class AnalistaService {

  private relativeLink = 'analista'

  constructor(
    private http: HttpClient
  ) { }

  getAnalista() {
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
        }

      ]
    )

    // return this.http.get(`${environment.url.apirest}/${this.relativeLink}`);
  }

  editarAnalista() {

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
        }

      ]
    )
    // return this.http.get(`${environment.url.apirest}/${this.relativeLink}`);
  }

  atualizarAnalista() {

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
        }

      ]
    )
    // return this.http.get(`${environment.url.apirest}/${this.relativeLink}`);
  }
}
