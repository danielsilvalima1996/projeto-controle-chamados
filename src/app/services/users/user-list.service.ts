import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  constructor() { }
  getUser() {
    return of(
      [
        {
          "idUser": '1',
          "nomeUser": "Gustavo",
          "emailUser": "gustavo@lobios.com.br",
          "idEmpresa": "1",
          "regra": "Admin",
          "created": "2019-09-16",
          "modified": "2019-09-16",
          "status": "Ativo"
        },
        {
          "idUser": '2',
          "nomeUser": "Vitor",
          "emailUser": "vitor@lobios.com.br",
          "idEmpresa": "1",
          "regra": "Analista",
          "created": "2019-09-16",
          "modified": "2019-09-16",
          "status": "Ativo"
        }

      ]
    )
  }

}
