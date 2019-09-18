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
          "idAnalista": '1',
          "nomeAnalista": "Gustavo",
          "emailAnalista": "gustavo@lobios.com.br",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "status": "Ativo"
        },
        {
          "idAnalista": '2',
          "nomeAnalista": "Vitor",
          "emailAnalista": "vitor@lobios.com.br",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "status": "Ativo"
        },
        {
          "idAnalista": '3',
          "nomeAnalista": "Saulo",
          "emailAnalista": "saulo@lobios.com.br",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "status": "Ativo"
        },
        {
          "idAnalista": '4',
          "nomeAnalista": "Carlos",
          "emailAnalista": "carlos@lobios.com.br",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "status": "Ativo"
        },
        {
          "idAnalista": '5',
          "nomeAnalista": "Aline",
          "emailAnalista": "aline@lobios.com.br",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "status": "Inativo"
        },
        {
          "idAnalista": '6',
          "nomeAnalista": "Winston",
          "emailAnalista": "winston@lobios.com.br",
          "created": "2019-09-13",
          "modified": "2019-09-13",
          "status": "Ativo"
        }

      ]
    )
  }

}
