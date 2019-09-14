import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoTableColumn, PoSelectOption } from '@portinari/portinari-ui';
import { Router } from '@angular/router';
import { ChamadosInternosService } from 'src/app/services/chamados/chamados-internos/chamados-internos.service';
import { ChamadosExternosService } from 'src/app/services/chamados/chamados-externos/chamados-externos.service';
import { UtilService } from 'src/app/services/utils/util-service/util.service';
import { FormGroup, FormBuilder } from '@angular/forms';

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

  selects = {
    pesquisa: <PoSelectOption[]>[
      { label: 'Id', value: 'id' },
      { label: 'Analista', value: 'analista' },
      { label: 'Status', value: 'status' },
      { label: 'Assunto', value: 'assunto' },
      { label: 'Descricao', value: 'descricao' }
    ]
  }

  chamadosForm: FormGroup = this.fb.group({
    pesquisa: ['', []],
    filtro: ['', []],
  })

  constructor(
    private router: Router,
    private chamadosInternosService: ChamadosInternosService,
    private chamadosExternosService: ChamadosExternosService,
    private utilService: UtilService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    let router = this.router.url.toString();
    this.changeTitle(router);
    this.table.height = this.utilService.calcularHeight(innerHeight, 0.50);
  }

  get controls() {
    return this.chamadosForm.controls;
  }

  private changeTitle(router: string) {
    let columns: PoTableColumn[];
    if (router == '/chamados/interno') {
      columns = []
      this.page.title = 'Chamados Internos';

      columns = <PoTableColumn[]>[
        {
          label: '-', property: 'idStatus', type: 'subtitle', width: '100px', subtitles: [
            { value: 1, label: 'ANALISANDO', color: 'color-08', content: '!' },
            { value: 2, label: 'FECHADO', color: 'color-10', content: 'OK' }
          ]
        },
        { label: 'Id Chamado', property: 'id', width: '100px' },
        { label: 'Id Empresa', property: 'idEmpresa', width: '100px' },
        { label: 'Id Analista', property: 'idAnalista', width: '100px' },
        { label: 'Data Abertura', property: 'dataAbertura', width: '125px', type: 'date', format: 'dd/MM/yyyy' },
        { label: 'Hora Abertura', property: 'horaAbertura', width: '125px' },
        { label: 'Data Fechamento', property: 'dataFechamento', width: '125px', type: 'date', format: 'dd/MM/yyyy' },
        { label: 'Hora Fechamento', property: 'horaFechamento', width: '125px' },
        { label: 'Tempo', property: 'tempo', width: '100px' },
        { label: 'Status', property: 'status', width: '100px' },
        { label: 'Tipo', property: 'tipo', width: '100px' },
        { label: 'Assunto', property: 'assunto', width: '150px' },
        { label: 'Descrição', property: 'descricao', width: '250px' },
        { label: 'Solução', property: 'solucao', width: '200px' }
      ];
      this.filtrar();

    } else {
      this.page.title = 'Chamados Externos';
      columns = <PoTableColumn[]>[
        {
          label: '-', property: 'idStatus', type: 'subtitle', width: '100px', subtitles: [
            { value: 1, label: 'ANALISANDO', color: 'color-08', content: '!' },
            { value: 2, label: 'FECHADO', color: 'color-10', content: 'OK' }
          ]
        },
        { label: 'Id Chamado', property: 'id', width: '100px' },
        { label: 'Id Empresa', property: 'idEmpresa', width: '100px' },
        { label: 'Id User', property: 'idUser', width: '100px' },
        { label: 'Data Abertura', property: 'dataAbertura', width: '125px', type: 'date', format: 'dd/MM/yyyy' },
        { label: 'Hora Abertura', property: 'horaAbertura', width: '125px' },
        { label: 'Data Fechamento', property: 'dataFechamento', width: '125px', type: 'date', format: 'dd/MM/yyyy' },
        { label: 'Hora Fechamento', property: 'horaFechamento', width: '125px' },
        { label: 'Tempo', property: 'tempo', width: '100px' },
        { label: 'Status', property: 'status', width: '100px' },
        { label: 'Tipo', property: 'tipo', width: '100px' },
        { label: 'Assunto', property: 'assunto', width: '150px' },
        { label: 'Descrição', property: 'descricao', width: '250px' },
        { label: 'Solução', property: 'solucao', width: '200px' },
        { label: 'Anexo', property: 'anexo', width: '100px' }
      ];
      this.filtrar();
    }
    this.table.columns = columns;
  }

  private getChamadosExternos(parameters?: any) {
    this.chamadosExternosService
      .getChamadosExternos(parameters)
      .subscribe((data) => {
        this.table.items = data;
      })
  }

  private getChamadosInternos(parameters?: any) {
    this.chamadosInternosService
      .getChamadosInternos(parameters)
      .subscribe((data) => {
        this.table.items = data;
      })
  }

  filtrar() {
    console.log('ok, fazer a funcao');
    
  }

}
