import { Component, OnInit } from '@angular/core';
import { PoPageAction, PoBreadcrumb, PoBreadcrumbItem, PoTableColumn, PoSelectOption, PoNotificationService } from '@portinari/portinari-ui';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TipoChamadoService } from 'src/app/services/chamados/tipo-chamado/tipo-chamado.service';
import { UtilService } from 'src/app/services/utils/util-service/util.service';
import { Pagination } from 'src/app/interfaces/pagination.model';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-tipo-chamado-list',
  templateUrl: './tipo-chamado-list.component.html',
  styleUrls: ['./tipo-chamado-list.component.css']
})
export class TipoChamadoListComponent implements OnInit {

  page = {
    actions: <PoPageAction[]>[
      { label: 'Novo', url: 'tipo-chamado/add', icon: 'po-icon po-icon-plus-circle' },
      { label: 'Editar', action: () => { this.editarTipoChamado() } }
    ],

    title: 'Tipo Chamado',
    breadcrumb: <PoBreadcrumb>{
      items: <PoBreadcrumbItem[]>[
        { label: 'Dashboard' },
        { label: 'Cadastros' },
        { label: 'Tipo Chamado' }
      ]
    }
  }

  table = {
    columns: <PoTableColumn[]>[
      { property: 'id', label: 'ID', width: '10%' },
      { property: 'descricao', label: 'Descrição', width: '35%' },
      { property: 'created', label: 'Criado ', width: '15%', type: 'date', format: 'dd/MM/yyyy' },
      { property: 'modified', label: 'Modificado ', width: '15%', type: 'date', format: 'dd/MM/yyyy' },
      { property: 'active', label: 'Ativo', width: '15%', type: 'boolean' }
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
    ],
    filtro: <PoSelectOption[]>[
      { label: 'SIM', value: 'true' },
      { label: 'NÃO', value: 'false' }
    ]
  }

  tipoChamadoForm: FormGroup = this.fb.group({
    filtro: ['', [Validators.required]],
    pesquisa: ['']
  })

  constValue = {
    selecionado: '',
    input: <Boolean>true,
    select: <Boolean>false,
    number: <Boolean>false,
  }

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
    this.controls.pesquisa
      .valueChanges.pipe(debounceTime(200))
      .subscribe((data) => {
        this.controls.filtro.reset();
        this.tipoForm(data);
      })
    this.getTipoChamado(this.tipoChamadoForm.value);
  }

  get controls() {
    return this.tipoChamadoForm.controls;
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
        this.constValue.number = false;
        break;
      default:
        this.constValue.input = true;
        this.constValue.select = false;
        this.constValue.number = false;
        break;
    }
  }

  getTipoChamado(form?) {
    this.table.loading = true;
    this.tipoChamadoService.getTipoChamado(this.utilService.getParameters(form))
      .subscribe((data: any) => {
        this.table.items = data.content
        this.pagination.totalItems = data.totalElements;
        this.pagination.itemsPerPage = data.size;
        this.table.loading = false;
      })
  }

  getSelected(event) {
    this.constValue.selecionado = event.id;

  }

  getUnSelected() {
    this.constValue.selecionado = ''

  }

  onPageChange(event: number) {
    this.pagination.currentPage = event;
    let busca: string = Object.assign({}, this.tipoChamadoForm.value, { page: this.pagination.currentPage });
    this.getTipoChamado(busca);
  }

  private editarTipoChamado() {
    if (this.constValue.selecionado == null || this.constValue.selecionado == '') {
      this.notificationService.warning('Selecione um Tipo de Chamado para editar!');
      return;
    } else {
      this.router.navigate(['edit', this.constValue.selecionado], { relativeTo: this.route })
    }
  }



}
