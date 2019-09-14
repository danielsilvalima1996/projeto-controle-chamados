import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChamadosInternosService {

  constructor() { }

  getChamadosInternos(parameters: any) {
    console.log(parameters);

    return of(
      [
        {
          "id": 1,
          "idEmpresa": 5,
          "idAnalista": "VICTOR LEME",
          "dataAbertura": "2019-09-12",
          "horaAbertura": "14:16:00",
          "dataFechamento": "2019-09-13",
          "horaFechamento": "17:25:00",
          "tempo": "05:00:00",
          "status": "FECHADO",
          "idStatus": 2,
          "tipo": "NÃO SEI O QUE COLOCAR",
          "assunto": "SERVIDOR",
          "descricao": "CONFIGURAÇÃO DE SERVIDOR",
          "solucao": "FORMATEI A MAQUINA"
        },
        {
          "id": 2,
          "idEmpresa": 11,
          "idAnalista": "WINSTON",
          "dataAbertura": "2019-09-10",
          "horaAbertura": "10:14:00",
          "dataFechamento": "2019-09-11",
          "horaFechamento": "12:31:00",
          "tempo": "02:15:00",
          "status": "ANALISANDO",
          "idStatus": 1,
          "tipo": "NÃO SEI O QUE COLOCAR",
          "assunto": "BACKUP",
          "descricao": "CONFIGURANDO BACKUP SERVIDOR",
          "solucao": ""
        },
        {
          "id": 3,
          "idEmpresa": 1,
          "idAnalista": "SAULO",
          "dataAbertura": "2019-09-01",
          "horaAbertura": "09:00:00",
          "dataFechamento": "2019-09-01",
          "horaFechamento": "09:20:00",
          "tempo": "00:20:00",
          "status": "ANALISANDO",
          "idStatus": 1,
          "tipo": "NÃO SEI O QUE COLOCAR",
          "assunto": "PORTAL",
          "descricao": "CONFIGURANDO DOCKER",
          "solucao": ""
        },
        {
          "id": 4,
          "idEmpresa": 2,
          "idAnalista": "GUSTAVO",
          "dataAbertura": "2019-09-03",
          "horaAbertura": "17:00:00",
          "dataFechamento": "2019-09-03",
          "horaFechamento": "17:35:00",
          "tempo": "00:35:00",
          "status": "FECHADO",
          "idStatus": 2,
          "tipo": "NÃO SEI O QUE COLOCAR",
          "assunto": "LINUX",
          "descricao": "REDE",
          "solucao": "CONFIGURADO DNS"
        },
        {
          "id": 5,
          "idEmpresa": 7,
          "idAnalista": "CARLOS",
          "dataAbertura": "2019-09-10",
          "horaAbertura": "10:00:00",
          "dataFechamento": "2019-09-10",
          "horaFechamento": "11:00:00",
          "tempo": "01:00:00",
          "status": "ANALISANDO",
          "idStatus": 1,
          "tipo": "NÃO SEI O QUE COLOCAR",
          "assunto": "TELEFONE",
          "descricao": "SEM REDE",
          "solucao": ""
        }
      ]
    )

  }
}
