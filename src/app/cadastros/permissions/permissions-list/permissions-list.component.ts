import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoTableColumn, PoSelectOption, PoNotificationService } from '@po-ui/ng-components';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilService } from 'src/app/services/utils/util-service/util.service';
import { PermissionsService } from 'src/app/services/cadastros/permissions/permissions.service';
import { Pagination } from 'src/app/interfaces/pagination.model';

@Component({
  selector: 'app-permissions-list',
  templateUrl: './permissions-list.component.html',
  styleUrls: ['./permissions-list.component.css']
})
export class PermissionsListComponent implements OnInit {

  page: PoPageDefault = {

    title: ' Cadastro de Permissões',
    breadcrumb:
    {
      items: [
        { label: 'Dashboard' },
        { label: 'Cadastros' },
        { label: 'Permissões' }
      ]
    },
    actions: [
      { label: 'Nova', icon: 'po-icon po-icon-plus-circle', url: 'permission/add' },
      {
        label: 'Editar', action: () => {
          this.editarPermissao()
        }
      }
    ],
  }

  table = {
    columns: <PoTableColumn[]>[
      { property: 'id', label: 'ID', width: '10%' },
      { property: 'description', label: 'Descrição', width: '20%' },
      { property: 'active', label: 'Ativo', width: '20%', type: 'boolean' },
      { property: 'created', label: 'Criado', width: '20%', type: 'date', format: 'dd/MM/yyyy' },
      { property: 'modified', label: 'Modificado', width: '20%', type: 'date', format: 'dd/MM/yyyy' }
    ],
    items: [],
    height: 0,
    loading: false
  }

  selects = {
    pesquisa: <PoSelectOption[]>[
      { label: 'ID', value: 'id' },
      { label: 'DESCRIÇÃO', value: 'description' },
      { label: 'ATIVO', value: 'active' }
    ],
    filtro: <PoSelectOption[]>[
      { label: 'SIM', value: 'true' },
      { label: 'NÃO', value: 'false' }
    ]
  }

  permissionForm: FormGroup = this.fb.group({
    pesquisa: ['', []],
    filtro: ['', []]
  })

  constValue = {
    selecionado: '',
    input: <Boolean>true,
    select: <Boolean>false,
    number: <boolean>false
  }

  pagination: Pagination = {
    totalItems: 0,
    itemsPerPage: 5,
    currentPage: 1
  }

  constructor(
    private fb: FormBuilder,
    private permissionService: PermissionsService,
    private router: Router,
    private route: ActivatedRoute,
    private utilService: UtilService,
    private notificationService: PoNotificationService
  ) { }

  ngOnInit() {
    this.table.height = this.utilService.calcularHeight(innerHeight, 0.5);
    this.controls.pesquisa
      .valueChanges.subscribe((data) => {
        this.tipoForm(data);
        this.controls.filtro.reset();
      })
    this.getPermission(this.permissionForm.value);
  }

  get controls() {
    return this.permissionForm.controls;
  }

  tipoForm(tipo) {
    switch (tipo) {
      case 'id':
        this.constValue.input = false;
        this.constValue.number = true;
        this.constValue.select = false;
        break;
      case 'description':
        this.constValue.input = true;
        this.constValue.number = false;
        this.constValue.select = false;
        break;
      case 'active':
        this.constValue.input = false;
        this.constValue.number = false;
        this.constValue.select = true;
        break;
      default:
        this.constValue.input = false;
        this.constValue.number = true;
        this.constValue.select = false;
        break;
    }
  }

  getPermission(form?) {
    this.table.loading = true;
    this.permissionService.findAll(this.utilService.getParameters(form))
      .subscribe((data) => {
        this.table.items = data.content;
        this.pagination.totalItems = data.totalElements;
        this.pagination.itemsPerPage = data.size;
        this.table.loading = false;
      })

  }

  getSelected(event) {
    this.constValue.selecionado = event.id;
  }

  getUnSelected() {
    this.constValue.selecionado = '';
  }

  editarPermissao() {
    if (this.constValue.selecionado == null || this.constValue.selecionado == '') {
      this.notificationService.warning('Selecione uma Permissão para editar!');
      return;
    } else {
      this.router.navigate(['edit', this.constValue.selecionado], { relativeTo: this.route });
    }
  }

  onPageChange(event: number) {
    this.pagination.currentPage = event;
    let busca: string = Object.assign({}, this.permissionForm.value, { page: this.pagination.currentPage });
    this.getPermission(busca);
  }
}