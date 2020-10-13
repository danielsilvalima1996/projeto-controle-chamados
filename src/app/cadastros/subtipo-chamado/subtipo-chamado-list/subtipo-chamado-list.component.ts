import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoTableColumn, PoSelectOption, PoNotificationService } from '@po-ui/ng-components';
import { SubtipoChamadoService } from 'src/app/services/chamados/subtipo-chamado/subtipo-chamado.service';
import { UtilService } from 'src/app/services/utils/util-service/util.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorSpringBoot } from 'src/app/interfaces/ErrorSpringBoot.model';
import { Pagination } from 'src/app/interfaces/pagination.model';
import { TipoChamadoService } from 'src/app/services/chamados/tipo-chamado/tipo-chamado.service';
import { SubtipoChamado } from 'src/app/interfaces/subtipo-chamado.model';

@Component({
  selector: 'app-subtipo-chamado-list',
  templateUrl: './subtipo-chamado-list.component.html',
  styleUrls: ['./subtipo-chamado-list.component.css']
})
export class SubtipoChamadoListComponent implements OnInit {

  page: PoPageDefault = {
    title: 'SubTipo Chamado',
    breadcrumb: {
      items: [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'SubTipo Chamado' },
      ]
    },
    actions: [
      { label: 'Novo', icon: 'po-icon po-icon-plus-circle', url: 'subtipo-chamado/add' },
      {
        label: 'Editar', action: () => { this.goToSubtipoChamado('edit') }
      },
      {
        label: 'Visualizar', action: () => { this.goToSubtipoChamado('view') }
      }
    ],
  }

  table = {
    columns: <PoTableColumn[]>[
      { property: 'id', label: 'ID', width: '5%' },
      { property: 'descricao', label: 'Descrição', width: '20%' },
      { property: 'idTipoChamado', label: 'Tipo Chamado', width: '15%' },
      { property: 'criado', label: 'Criado', width: '10%', type: 'date', format: 'dd/MM/yyyy' },
      { property: 'modificado', label: 'Modificado', width: '10%', type: 'date', format: 'dd/MM/yyyy' },
      { property: 'criadoPor', label: 'Criado Por', width: '15%' },
      { property: 'modificadoPor', label: 'Modificado Por', width: '15%' },
      { property: 'ativo', label: 'Ativo', width: '10%', type: 'boolean' }
    ],
    items: [],
    height: 0,
    loading: false
  }

  selects = {
    ativo: <PoSelectOption[]>[
      { label: 'Ativo', value: true },
      { label: 'Inativo', value: false },
      { label: 'Todos', value: '' }
    ]
  }

  pagination: Pagination = {
    totalItems: 0,
    itemsPerPage: 30,
    currentPage: 1
  }

  private itemSelecionado = '';
  public loading: boolean;

  subtipoForm: FormGroup = this.fb.group({
    id: ['', []],
    descricao: ['', []],
    ativo: ['', []]
  });

  constructor(
    private subtipoChamadoService: SubtipoChamadoService,
    private utilService: UtilService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: PoNotificationService,
    private tipoChamadoService: TipoChamadoService
  ) { }

  ngOnInit() {
    this.table.height = this.utilService.calcularHeight(innerHeight, 0.5);
    this.findSubtipoChamado(this.subtipoForm.value);
  }

  get controls() {
    return this.subtipoForm.controls;
  }

  findSubtipoChamado(parameters?: any) {
    this.loading = true;
    this.subtipoChamadoService
      .findSubtipoChamado(this.utilService.getParameters(parameters))
      .subscribe((data) => {
        this.table.items = data;
        // let arr: Array<any> = data.map((item) => {
        //   let obj = {};
        //   Object.keys(item).map((data) => {
        //     if (item[data] == '' || item[data] == null) {
        //       obj[data] = '-';
        //     } else if (data == 'idTipoChamado') {
        //       obj[data] = item[data].descricao;
        //     } else {
        //       obj[data] = item[data];
        //     }

        //   })
        //   return obj;
        // })
        // this.table.items = arr;
        this.table.items = data.map(item => {
          return {
            id: item.id,
            descricao: item.descricao,
            idTipoChamado: item.idTipoChamado.descricao,
            criado: item.criado,
            modificado: item.modificado,
            criadoPor: item.criadoPor,
            modificadoPor: item.modificadoPor,
            ativo: item.ativo,
          }
        })
        this.loading = false;

      },
        (error: ErrorSpringBoot) => {
          // this.notificationService.error(error.message);
          this.table.items = [];
          this.loading = false;
        })
  }

  private tipoChamadoList() {
    // this.tipoChamadoService
    //   .findAll().subscribe((data) => {
    //     let arr = data.map((item) => {
    //       return <PoSelectOption>{ label: item.descricao, value: item.id }
    //     })
    //     this.selects.tipoChamado = arr;
    //   })
  }

  getSelected(event) {
    this.itemSelecionado = event.id;

  }

  getUnSelected() {
    this.itemSelecionado = ''

  }
  onPageChange(event: number) {
    this.pagination.currentPage = event;
    let busca: string = Object.assign({}, this.subtipoForm.value, { page: this.pagination.currentPage });
    this.findSubtipoChamado(busca);
  }

  goToSubtipoChamado(tipoTela: string) {
    switch (tipoTela) {
      case 'edit':
        if (this.itemSelecionado == null || this.itemSelecionado == '') {
          this.notificationService.warning('Selecione um SubTipo de Chamado para editar!');
          return;
        } else {
          this.router.navigate(['edit', this.itemSelecionado], { relativeTo: this.route })
        }
        break;
      case 'view':
        if (this.itemSelecionado == null || this.itemSelecionado == '') {
          this.notificationService.warning('Selecione um SubTipo de Chamado para visualizar!');
          return;
        } else {
          this.router.navigate(['view', this.itemSelecionado], { relativeTo: this.route })
        }
        break;
      default:
        break;
    }
  }

}
