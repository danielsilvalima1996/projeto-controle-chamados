import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesListService {

  private relativeLink = 'role-list'

  constructor() { }

  getRoles() {
    return of(
      [
        {
          "id": "1",
          "idEmpresa": "1",
          "nomeRegra": "Analista",
          "ativo": "Ativa",
          "created": "2019-09-14",
          "modified": "2019-09-14"
        },
      ]
    )
  }
}




