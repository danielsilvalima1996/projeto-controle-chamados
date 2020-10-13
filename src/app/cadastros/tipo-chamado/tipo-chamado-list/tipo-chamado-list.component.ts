import { Component, OnInit } from '@angular/core';
import { PoPageAction, PoBreadcrumb, PoBreadcrumbItem, PoTableColumn, PoSelectOption, PoNotificationService } from '@po-ui/ng-components';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TipoChamadoService } from 'src/app/services/chamados/tipo-chamado/tipo-chamado.service';
import { UtilService } from 'src/app/services/utils/util-service/util.service';
import { Pagination } from 'src/app/interfaces/pagination.model';
import { debounceTime } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-tipo-chamado-list',
  templateUrl: './tipo-chamado-list.component.html',
  styleUrls: ['./tipo-chamado-list.component.css']
})
export class TipoChamadoListComponent implements OnInit {

  page = {
    actions: <PoPageAction[]>[
      { label: 'Novo', url: 'tipo-chamado/add', icon: 'po-icon po-icon-plus-circle' },
      { label: 'Editar', action: () => { this.editarTipoChamado() } },
      { label: 'Visualizar', action: () => { this.viewTipoChamado() } }
    ],

    title: 'Tipo Chamado',
    breadcrumb: <PoBreadcrumb>{
      items: <PoBreadcrumbItem[]>[
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Tipo Chamado' }
      ]
    }
  }

  table = {
    columns: <PoTableColumn[]>[
      { property: 'id', label: 'ID', width: '10%' },
      { property: 'descricao', label: 'Descrição', width: '15%' },
      { property: 'criado', label: 'Criado ', width: '15%', type: 'date', format: 'dd/MM/yyyy' },
      { property: 'modificado', label: 'Modificado ', width: '15%', type: 'date', format: 'dd/MM/yyyy' },
      { property: 'criadoPor', label: 'Criado Por', width: '15%' },
      { property: 'modificadoPor', label: 'Modificado Por', width: '15%' },
      { property: 'ativo', label: 'Ativo', width: '10%', type: 'boolean' }
    ],
    items: [],
    height: 0,
    loading: false
  }

  tipoChamadoForm: FormGroup = this.fb.group({
    id: ['', []],
    descricao: ['', []],
    ativo: ['']
  })

  selects = {
    ativoOptions: <Array<any>>[
      { label: 'Ativo', value: true },
      { label: 'Inativo', value: false },
      { label: 'Todos', value: '' }
    ]
  }

  private itemSelecionado: string = '';
  public loading: boolean;

  pagination: Pagination = {
    totalItems: 0,
    itemsPerPage: 30,
    currentPage: 1
  }


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private tipoChamadoService: TipoChamadoService,
    private utilService: UtilService,
    private notificationService: PoNotificationService
  ) { }

  ngOnInit() {
    this.table.height = this.utilService.calcularHeight(innerHeight, 0.5);
    this.getTipoChamado();
  }

  get controls() {
    return this.tipoChamadoForm.controls;
  }


  getTipoChamado() {
    this.loading = true;
    let obj = {
      id: this.controls.id.value,
      descricao: this.controls.descricao.value,
      ativo: this.controls.ativo.value
    }
    this.tipoChamadoService.findAll(this.utilService.getParameters(obj))
      .subscribe((data) => {
        this.table.items = data;
        this.loading = false;
      }, (err: HttpErrorResponse) => {
        console.error(err);
        this.table.items = [];
        this.loading = false;
      })
  }

  getSelected(event) {
    this.itemSelecionado = event.id;

  }

  getUnSelected() {
    this.itemSelecionado = ''

  }

  // onPageChange(event: number) {
  //   this.pagination.currentPage = event;
  //   let busca: string = Object.assign({}, this.tipoChamadoForm.value, { page: this.pagination.currentPage });
  //   this.getTipoChamado(busca);
  // }

  private editarTipoChamado() {
    if (this.itemSelecionado == null || this.itemSelecionado == '') {
      this.notificationService.warning('Selecione um Tipo de Chamado para editar!');
      return;
    } else {
      this.router.navigate(['edit', this.itemSelecionado], { relativeTo: this.route })
    }
  }

  private viewTipoChamado() {
    if (this.itemSelecionado == null || this.itemSelecionado == '') {
      this.notificationService.warning('Selecione uma regra para visualizar!');
      return;
    } else {
      this.router.navigate(['view', this.itemSelecionado], { relativeTo: this.route });
    }
  }



}
