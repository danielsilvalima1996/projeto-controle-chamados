import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PoTableColumn, PoPageAction, PoBreadcrumb, PoBreadcrumbItem, PoTableAction, PoSelectOption, PoNotificationService } from '@portinari/portinari-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { AnalistaService } from 'src/app/services/cadastros/analista/analista.service';
import { UtilService } from 'src/app/services/utils/util-service/util.service';
import { Pagination } from 'src/app/interfaces/pagination.model';

@Component({
  selector: 'app-analista-list',
  templateUrl: './analista-list.component.html',
  styleUrls: ['./analista-list.component.css']
})
export class AnalistaListComponent implements OnInit {

  page = {
    actions: <PoPageAction[]>[
      { label: 'Novo', icon: 'po-icon po-icon-user-add', url: 'analista/add' },
      { label: 'Editar', action: () => { this.editarAnalista() } },
    ],

    title: 'Cadastro de Analistas',
    breadcrumb: <PoBreadcrumb>{
      items: <PoBreadcrumbItem[]>[
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Analistas' }
      ]
    }
  }

  table = {
    columns: <PoTableColumn[]>[
      { property: 'id', label: 'ID', width: '10%' },
      { property: 'nome', label: 'Analista', width: '20%' },
      { property: 'email', label: 'E-mail', width: '20%' },
      { property: 'matricula', label: 'Matricula', width: '10%' },
      { property: 'criado', label: 'Criado em ', width: '15%', type: 'date', format: 'dd/MM/yyyy' },
      { property: 'modificado', label: 'Modificado em ', width: '15%', type: 'date', format: 'dd/MM/yyyy' },
      { property: 'ativo', label: 'Ativo', width: '10%', type: 'boolean' }
    ],
    items: [],
    height: 0,
    loading: false
  }

  pagination: Pagination = {
    totalItems: 0,
    itemsPerPage: 30,
    currentPage: 1
  }

  analistaform: FormGroup = this.fb.group({
    filtro: ['', []],
    pesquisa: ['', []]
  })

  selects = {
    pesquisa: <PoSelectOption[]>[
      { label: 'ID', value: 'id' },
      { label: 'ANALISTA', value: 'nome' },
      { label: 'ATIVO', value: 'ativo' },
      { label: 'E-MAIL', value: 'email' },
      { label: 'MATRÍCULA',value: 'matricula'},
    ],
    filtro: <PoSelectOption[]>[
      { label: 'SIM', value: 'true' },
      { label: 'NÃO', value: 'false' }
    ]
  }

  constValue = {
    itemSelecionado: '',
    analistaId: '',
    input: <Boolean>true,
    select: <Boolean>false
  }

  constructor(
    private fb: FormBuilder,
    private analistaService: AnalistaService,
    private router: Router,
    private notificationService: PoNotificationService,
    private route: ActivatedRoute,
    private utilService: UtilService
  ) { }



  ngOnInit() {
    this.table.height = this.utilService.calcularHeight(innerHeight, 0.5);
    this.controls.pesquisa
      .valueChanges.subscribe((data) => {
        this.tipoForm(data);
      })
    this.getAnalista(this.analistaform.value)

  }

  get controls() {
    return this.analistaform.controls;
  }

  tipoForm(tipo) {
    if (tipo == 'ativo') {
      this.constValue.input = false;
      this.constValue.select = true;
    } else {
      this.constValue.input = true;
      this.constValue.select = false;
    }
  }

  getAnalista(form?) {
    this.table.loading = true
    this.analistaService.getAnalista(this.utilService.getParameters(form))
      .subscribe((data) => {
        this.table.items = data.content;
        this.pagination.totalItems = data.totalElements;
        this.pagination.itemsPerPage = data.size;
        this.table.loading = false
      })

  }

  private editarAnalista() {
    if (this.constValue.itemSelecionado == null || this.constValue.itemSelecionado == '') {
      this.notificationService.warning('Selecione um Analista para editar!');
      return;
    } else {
      this.router.navigate(['edit', this.constValue.itemSelecionado], { relativeTo: this.route });
    }
  }

  getSelected(event) {
    this.constValue.itemSelecionado = event.id;
  }

  getUnSelected() {
    this.constValue.itemSelecionado = '';
  }

  isAnalistaSelected() {
    if (!this.constValue.itemSelecionado) {
      this.notificationService.warning('Selecione um Analista !');
      return;
    }
  }

  onPageChange(event: number) {
    this.pagination.currentPage = event;
    let busca: string = Object.assign({}, this.analistaform.value, { page: this.pagination.currentPage });
    this.getAnalista(busca);
  }

}
