import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoTableColumn, PoSelectOption } from '@portinari/portinari-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilService } from 'src/app/services/utils/util-service/util.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ChamadosRoutingModule } from '../chamados-routing.module';
import { ChamadosService, Chamados } from 'src/app/services/chamados/chamados/chamados.service';

@Component({
  selector: 'app-chamados-list',
  templateUrl: './chamados-list.component.html',
  styleUrls: ['./chamados-list.component.css']
})
export class ChamadosListComponent implements OnInit {

  page: PoPageDefault = {
    title: 'Lista de Chamados',
    actions: [
      { label: 'Novo', icon: 'po-icon po-icon-plus-circle', url: 'chamados/interno/add' },
      {
        label: 'Editar', action: () => {
          this.router.navigate(['chamados', this.constValue.tipoChamado, 'editar', this.constValue.selecionado]);
        }
      }
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
      { label: 'ID', value: 'id' },
      { label: 'ANALISTA', value: 'analista' },
      { label: 'STATUS', value: 'status' },
      { label: 'ASSUNTO', value: 'assunto' },
      { label: 'DESCRIÇÃO', value: 'descricao' }
    ]
  }

  constValue = {
    selecionado: '',
    tipoChamado: ''
  }

  chamadosForm: FormGroup = this.fb.group({
    pesquisa: ['', []],
    filtro: ['', []],
  })

  constructor(
    private router: Router,
    private chamadosService: ChamadosService,
    private utilService: UtilService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    let router = this.router.url.toString();
    this.changeTitle(router);
    this.table.height = this.utilService.calcularHeight(innerHeight, 0.50);
    this.findAll();

    alert('adicionar no endpoint o campo usuario, no spring, na interface e em tudo');
  }

  get controls() {
    return this.chamadosForm.controls;
  }

  filtrar() {

  }

  private changeTitle(router: string) {
    let columns: PoTableColumn[];
    if (router == '/chamados/interno') {
      columns = [];
      this.constValue.tipoChamado = 'interno';
      this.page.title = 'Chamados Internos';
      columns = <PoTableColumn[]>[
        {
          label: '-', property: 'idStatus', type: 'subtitle', width: '100px', subtitles: [
            { value: 1, label: 'ANALISANDO', color: 'color-08', content: '!' },
            { value: 3, label: 'EM ABERTO', color: 'color-06', content: '!' },
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
      // this.getChamadosInternos();

    } else {
      this.page.title = 'Chamados Externos';
      this.constValue.tipoChamado = 'externo';
      columns = <PoTableColumn[]>[
        {
          label: '-', property: 'idStatus', type: 'subtitle', width: '100px', subtitles: [
            { value: 1, label: 'EM ABERTO', color: 'color-06', content: '!' },
            { value: 2, label: 'ANALISANDO', color: 'color-08', content: '!' },
            { value: 3, label: 'FECHADO', color: 'color-10', content: 'OK' }
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
      // this.getChamadosExternos();
    }
    this.table.columns = columns;
  }

  getSelected(event) {
    this.constValue.selecionado = event.id;
    console.log(event.id);
  }

  findAll() {
    this.chamadosService
    .findAll()
    .subscribe((data) => {
      this.table.items = data;
    })
  }

}
