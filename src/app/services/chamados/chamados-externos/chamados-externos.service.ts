import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChamadosExternosService {

  constructor() { }

  getChamadosExternos(parameters: any) {
    return of(
      [
        {
          "id": 1,
          "idEmpresa": 5,
          "idUser": "VICTOR LEME",
          "data": "2019-09-12",
          "horaCriado": "14:16:00",
          "dataFechado": "2019-09-13",
          "horaFechado": "17:25:00",
          "tempo": "05:00:00",
          "status": "FECHADO",
          "tipo": "NÃO SEI O QUE COLOCAR",
          "assunto": "SERVIDOR",
          "descricao": "CONFIGURAÇÃO DE SERVIDOR",
          "solucao": "FORMATEI A MAQUINA",
          "anexo": "NÃO SEI",
          "flagAlerta": 2
        },
        {
          "id": 2,
          "idEmpresa": 11,
          "idUser": "WINSTON",
          "data": "2019-09-10",
          "horaCriado": "10:14:00",
          "dataFechado": "2019-09-11",
          "horaFechado": "12:31:00",
          "tempo": "02:15:00",
          "status": "ANALISANDO",
          "tipo": "NÃO SEI O QUE COLOCAR",
          "assunto": "BACKUP",
          "descricao": "CONFIGURANDO BACKUP SERVIDOR",
          "solucao": "",
          "anexo": "NÃO SEI",
          "flagAlerta": 1
        },
        {
          "id": 3,
          "idEmpresa": 1,
          "idUser": "SAULO",
          "data": "2019-09-01",
          "horaCriado": "09:00:00",
          "dataFechado": "2019-09-01",
          "horaFechado": "09:20:00",
          "tempo": "00:20:00",
          "status": "ANALISANDO",
          "tipo": "NÃO SEI O QUE COLOCAR",
          "assunto": "PORTAL",
          "descricao": "CONFIGURANDO DOCKER",
          "solucao": "",
          "anexo": "NÃO SEI",
          "flagAlerta": 1
        }
      ]
    )
  }
}
