import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoTableColumn } from '@portinari/portinari-ui';
import { Router } from '@angular/router';
import { ChamadosInternosService } from 'src/app/services/chamados/chamados-internos/chamados-internos.service';
import { ChamadosExternosService } from 'src/app/services/chamados/chamados-externos/chamados-externos.service';

@Component({
  selector: 'app-chamados-list',
  templateUrl: './chamados-list.component.html',
  styleUrls: ['./chamados-list.component.css']
})
export class ChamadosListComponent implements OnInit {

  page: PoPageDefault = {
    title: 'Lista de Chamados',
    actions: [
      { label: 'Novo', icon: 'po-icon po-icon-plus-circle', url: 'chamados/add' }
    ],
    breadcrumb: {
      items: [
        { label: 'Home' },
        { label: 'Lista de Chamados' }
      ]
    }
  }

  table = {
    columns: <PoTableColumn[]>[],
    items: [],
    loading: <boolean>false,
    height: 0
  }

  constructor(
    private router: Router,
    private chamadosInternosService: ChamadosInternosService,
    private chamadosExternosService: ChamadosExternosService
  ) { }

  ngOnInit() {
    let router = this.router.url.toString();
    this.changeTitle(router);
    this.getChamadosExternos('0');
  }

  private changeTitle(router: string) {
    if (router == '/chamados/interno') {
      this.page.title = 'Chamados Internos';
    } else {
      this.page.title = 'Chamados Externos';
    }
  }

  private changeTable(router: string) {
    this.table.items = <PoTableColumn[]>[
      { label: '', property: 'id', width: '' },
      { label: '', property: 'idEmpresa', width: '' },
      { label: '', property: 'idUser', width: '' },
      { label: '', property: 'data', width: '' },
      { label: '', property: 'horaCriado', width: '' },
      { label: '', property: 'dataFechado', width: '' },
    ]

    /**{
          "id": 1,
          "idEmpresa": 5,
          "idUser": "VICTOR LEME",
          "data": "12/09/19",
          "horaCriado": "14:16:00",
          "dataFechado": "13/09/19",
          "horaFechado": "17:25:00",
          "tempo": "05:00:00",
          "status": "FECHADO",
          "tipo": "NÃO SEI O QUE COLOCAR",
          "assunto": "SERVIDOR",
          "descricao": "CONFIGURAÇÃO DE SERVIDOR",
          "solucao": "FORMATEI A MAQUINA",
          "anexo": "NÃO SEI",
          "flagAlerta": 2
        } */
  }

  getChamadosExternos(parameters?: any) {
    this.chamadosExternosService
      .getChamadosExternos(parameters)
      .subscribe((data) => {
        this.table.items = data;
      })
  }

}
