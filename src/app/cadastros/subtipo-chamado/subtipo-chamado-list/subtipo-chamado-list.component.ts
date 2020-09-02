import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoTableColumn, PoSelectOption, PoNotificationService } from '@po-ui/ng-components';
import { SubtipoChamadoService } from 'src/app/services/chamados/subtipo-chamado/subtipo-chamado.service';
import { UtilService } from 'src/app/services/utils/util-service/util.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorSpringBoot } from 'src/app/interfaces/ErrorSpringBoot.model';
import { Pagination } from 'src/app/interfaces/pagination.model';
import { TipoChamadoService } from 'src/app/services/chamados/tipo-chamado/tipo-chamado.service';

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
        { label: 'Dashboard' },
        { label: 'Cadastros' },
        { label: 'SubTipo Chamado' },
      ]
    },
    actions: [
      { label: 'Novo', icon: 'po-icon po-icon-plus-circle', url: 'subtipo-chamado/add' },
      {
        label: 'Editar', action: () => { this.editarSubtipoChamado() }
      }
    ],
  }

  table = {
    columns: <PoTableColumn[]>[
      { property: 'id', label: 'ID', width: '10%' },
      { property: 'descricao', label: 'Descrição', width: '20%' },
      { property: 'active', label: 'Ativo', width: '10%', type: 'boolean' },
      { property: 'idTipoChamado', label: 'Tipo Chamado', width: '20%' },
      { property: 'created', label: 'Criado', width: '15%', type: 'date', format: 'dd/MM/yyyy' },
      { property: 'modified', label: 'Modificado', width: '15%', type: 'date', format: 'dd/MM/yyyy' }
    ],
    items: [],
    height: 0,
    loading: false
  }

  selects = {
    pesquisa: <PoSelectOption[]>[
      { label: 'ID', value: 'id' },
      { label: 'DESCRIÇÃO', value: 'descricao' },
      { label: 'ATIVO', value: 'active' },
      { label: 'TIPO CHAMADO', value: 'idTipoChamado' }
    ],
    ativo: <PoSelectOption[]>[
      { label: 'SIM', value: 'true' },
      { label: 'NÃO', value: 'false' }
    ],
    tipoChamado: <PoSelectOption[]>[],
    filtro:<PoSelectOption[]>[]
  }

  pagination: Pagination = {
    totalItems: 0,
    itemsPerPage: 30,
    currentPage: 1
  }

  constValue = {
    selecionado: '',
    input: <boolean>true,
    select: <boolean>false,
    number: <boolean>false
  }

  subtipoForm: FormGroup = this.fb.group({
    filtro: ['', []],
    pesquisa: ['', []]
  })

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
    this.tipoChamadoList();
    this.controls.pesquisa
      .valueChanges.subscribe((data) => {
        this.tipoForm(data);
        this.controls.filtro.reset();
      })
    this.findSubtipoChamado(this.subtipoForm.value);
  }

  get controls() {
    return this.subtipoForm.controls;
  }

  findSubtipoChamado(parameters?: any) {
    this.table.loading = true;
    this.subtipoChamadoService
      .findSubtipoChamado(this.utilService.getParameters(parameters))
      .subscribe((data) => {
        let arr: Array<any> = data.content.map((item) => {
          let obj = {};
          Object.keys(item).map((data) => {
            if (item[data] == '' || item[data] == null) {
              obj[data] = '-';
            } else if (data == 'idTipoChamado') {
              obj[data] = item[data].descricao;
            } else {
              obj[data] = item[data];
            }

          })
          return obj;
        })
        this.table.items = arr;
        this.pagination.totalItems = data.totalElements;
        this.pagination.itemsPerPage = data.size;
        this.table.loading = false;

      },
        (error: ErrorSpringBoot) => {
          this.notificationService.error(error.message);
        })
  }

  tipoForm(tipo) {
    switch (tipo) {
      case 'id':
        this.constValue.input = false;
        this.constValue.select = false;
        this.constValue.number = true;
        break;
      case 'descricao':
        this.constValue.input = true;
        this.constValue.select = false;
        this.constValue.number = false;
        break;
      case 'active':
        this.constValue.input = false;
        this.constValue.select = true;
        this.selects.filtro = this.selects.ativo;
        this.constValue.number = false;
        break;
        case 'idTipoChamado':
          this.constValue.input = false;
          this.constValue.select = true;
          this.selects.filtro = this.selects.tipoChamado;
          this.constValue.number = false;
          break;

      default:
        this.constValue.input = true;
        this.constValue.select = false;
        this.constValue.number = false;
        break;
    }
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
    this.constValue.selecionado = event.id;

  }

  getUnSelected() {
    this.constValue.selecionado = ''

  }
  onPageChange(event: number) {
    this.pagination.currentPage = event;
    let busca: string = Object.assign({}, this.subtipoForm.value, { page: this.pagination.currentPage });
    this.findSubtipoChamado(busca);
  }

  editarSubtipoChamado() {
    if (this.constValue.selecionado == null || this.constValue.selecionado == '') {
      this.notificationService.warning('Selecione um SubTipo de Chamado para editar!');
      return;
    } else {
      this.router.navigate(['edit', this.constValue.selecionado], { relativeTo: this.route })
    }
  }

}
