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
          "id": '1',
          "username": "Gustavo",
          "email": "gustavo@lobios.com.br",
          "idEmpresa": "1",
          "regra": "Admin",
          "created": "2019-09-16",
          "modified": "2019-09-16",
          "ativo": "Ativo"
        },
        {
          "id": '2',
          "username": "Vitor",
          "email": "vitor@lobios.com.br",
          "idEmpresa": "1",
          "regra": "Analista",
          "created": "2019-09-16",
          "modified": "2019-09-16",
          "ativo": "Ativo"
        }

      ]
    )
    // return this.http.get(`${environment.url.apirest}/${this.relativeLink}`);
  }

  editUser(){
    return of(
      [
        {
          "id": '1',
          "username": "Gustavo",
          "email": "gustavo@lobios.com.br",
          "idEmpresa": "1",
          "regra": "ADMINISTRADOR",
          "senha":'',
          "created": "2019-09-16",
          "modified": "2019-09-16",
          "ativo": "Ativo"
        },
        {
          "id": '2',
          "username": "Vitor",
          "email": "vitor@lobios.com.br",
          "idEmpresa": "1",
          "regra": "ANALISTA",
          "created": "2019-09-16",
          "modified": "2019-09-16",
          "ativo": "Ativo"
        }

      ]
    )

  }

}