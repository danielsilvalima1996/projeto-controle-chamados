import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalistaListService {

  private relativeLink = 'analista-list'

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
          "created": "2019-09-13",
          "modified": "2019-09-13",
        },
        {
          "id": '2',
          "nome": "Vitor",
          "email": "vitor@lobios.com.br",
          "created": "2019-09-13",
          "modified": "2019-09-13",
        },
        {
          "id": '3',
          "nome": "Saulo",
          "email": "saulo@lobios.com.br",
          "created": "2019-09-13",
          "modified": "2019-09-13",
        },
        {
          "id": '4',
          "nome": "Carlos",
          "email": "carlos@lobios.com.br",
          "created": "2019-09-13",
          "modified": "2019-09-13",
        },
        {
          "id": '5',
          "nome": "Aline",
          "email": "aline@lobios.com.br",
          "created": "2019-09-13",
          "modified": "2019-09-13",
        },
        {
          "id": '6',
          "nome": "Winston",
          "email": "winston@lobios.com.br",
          "created": "2019-09-13",
          "modified": "2019-09-13",
        }

      ]
    )
  }

}
