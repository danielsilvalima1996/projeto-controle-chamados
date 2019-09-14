import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyListService {

  private relativeLink = 'empresa-list'

  constructor() { }

  getCompany() {
    return of(
      [
        {
          "id": 1,
          "cnpj": '17534128000138',
          "nomeFantasia": "CCPS",
          "razaoSocial": "CCPS/ROD NORTE",
          "endereco": "Avenidas das Nacoes Unidas, 8501",
          "admin": "Joao",
          "telefone": "1234-4321",
          "created": "2019-09-14",
          "modified": "2019-09-14"
        },
        {
          "id": 2,
          "cnpj": '9086490000165',
          "nomeFantasia": "GC Textil",
          "razaoSocial": "GC",
          "endereco": "Av.Papa Joao Paulo I, 6465 ",
          "admin": "Big Boss",
          "telefone": "1111-5222",
          "created": "2019-09-14",
          "modified": "2019-09-14"
        },
        {
          "id": 3,
          "cnpj": '15528936000124',
          "nomeFantasia": "Couve SA",
          "razaoSocial": "Couveira",
          "endereco": "Rua. Dos Couves",
          "admin": "Maria",
          "telefone": "3214-4568",
          "created": "2019-09-14",
          "modified": "2019-09-14"
        }
      ]

    )
  }
}
