import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private relativeLink = 'user'

  constructor(
    private http: HttpClient
  ) { }
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
    // return this.http.get(`${environment.url.apirest}/${this.relativeLink}`);
  }

  editUser(){
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