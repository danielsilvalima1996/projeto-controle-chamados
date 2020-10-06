import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoSelectOption, PoTableColumn, PoTableAction, PoPageAction, PoBreadcrumb, PoBreadcrumbItem, PoNotificationService } from '@po-ui/ng-components';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/cadastros/users/user.service';
import { UtilService } from 'src/app/services/utils/util-service/util.service';
import { ErrorSpringBoot } from 'src/app/interfaces/ErrorSpringBoot.model';
import { Pagination } from 'src/app/interfaces/pagination.model';
import { EmpresaService } from 'src/app/services/cadastros/empresa/empresa.service';
import { debounceTime } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { RegrasService } from 'src/app/services/cadastros/regras/regras.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  page = {
    actions: <PoPageAction[]>[
      { label: 'Novo', icon: 'po-icon po-icon-user-add', url: 'usuario/add' },
      { label: 'Editar', action: () => { this.goToUsuario('edit') } },
      { label: 'Visualizar', action: () => { this.goToUsuario('view') } }
    ],

    title: 'Usuário',
    breadcrumb: <PoBreadcrumb>{
      items: <PoBreadcrumbItem[]>[
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Usuário' }
      ]
    }
  }

  table = {
    columns: <PoTableColumn[]>[
      { property: 'id', label: 'ID', width: '5%' },
      { property: 'nomeCompleto', label: 'Nome Completo', width: '15%' },
      { property: 'email', label: 'E-mail', width: '15%' },
      { property: 'idEmpresa', label: 'Nome Fantasia', width: '15%' },
      { property: 'idRegra', label: 'Regra', width: '15%' },
      { property: 'criado', label: 'Criado ', width: '10%', type: 'date', format: 'dd/MM/yyyy' },
      { property: 'criadoPor', label: 'Criado Por', width: '15%' },
      { property: 'ativo', label: 'Ativo', width: '10%', type: 'boolean' }
    ],
    items: [],
    height: 0,
    loading: false
  }



  userform: FormGroup = this.fb.group({
    id: ['', []],
    email: ['', []],
    nomeCompleto: ['', []],
    ativo: ['', []],
    idRegra: ['', []],
    idEmpresa: ['', []],
    isTecnico: ['', []]
  })

  selects = {
    pesquisa: <PoSelectOption[]>[
      { label: 'ID', value: 'id' },
      { label: 'E-MAIL', value: 'userName' },
      { label: 'NOME', value: 'fullName' },
      { label: 'ATIVO', value: 'enabled' },
      { label: 'EMPRESA', value: 'idEmpresa' },
    ],
    ativoOptions: <Array<PoSelectOption>>[
      { label: 'Ativo', value: true },
      { label: 'Inativo', value: false },
      { label: 'Todos', value: '' }
    ],
    empresa: <PoSelectOption[]>[],
    regra: <PoSelectOption[]>[]
  }

  pagination: Pagination = {
    totalItems: 0,
    itemsPerPage: 30,
    currentPage: 1
  }

  public itemSelecionado = '';
  public loading: boolean;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private utilService: UtilService,
    private notificationService: PoNotificationService,
    private empresaService: EmpresaService,
    private regrasService:RegrasService
  ) { }



  ngOnInit() {
    this.retornaEmpresas();
    this.retornaRegras();
    this.table.height = this.utilService.calcularHeight(innerHeight, 0.5);
    this.findAll(this.userform.value);
  }

  get controls() {
    return this.userform.controls;
  }


  private retornaEmpresas() {
    this.empresaService
      .getEmpresa("ativo=true")
      .subscribe((data: any) => {
        let arr = data.map((item) => {
          return <PoSelectOption>{ label: item.nomeFantasia, value: item.id }
        })
        this.selects.empresa = arr;
      })
  }

  private retornaRegras() {
    this.regrasService
      .findAll("ativo=true")
      .subscribe((data: any) => {
        let arr = data.map((item) => {
          return <PoSelectOption>{ label: item.descricao, value: item.id }
        })
        this.selects.regra = arr;
      })
  }

  getSelected(event) {
    this.itemSelecionado = event.id;

  }

  getUnSelected() {
    this.itemSelecionado = ''
  }


  goToUsuario(tipoTela: string) {
    switch (tipoTela) {
      case 'edit':
        if (this.itemSelecionado == null || this.itemSelecionado == '') {
          this.notificationService.warning('Selecione um Usuário para editar!');
          return;
        } else {
          this.router.navigate(['edit', this.itemSelecionado], { relativeTo: this.route });
        }
        break;
      case 'view':
        if (this.itemSelecionado == null || this.itemSelecionado == '') {
          this.notificationService.warning('Selecione um Usuário para visualizar!');
          return;
        } else {
          this.router.navigate(['view', this.itemSelecionado], { relativeTo: this.route });
        }
        break;
      default:
        break;
    }
  }

  // onPageChange(event: number) {
  //   this.pagination.currentPage = event;
  //   let busca: string = Object.assign({}, this.userform.value, { page: this.pagination.currentPage });
  //   this.getUser(busca);
  // }

  public findAll(form?) {
    this.table.loading = true;
    this.userService
      .getUser(this.utilService.getParameters(form))
      .subscribe((data: any) => {
        let arr: Array<any> = data.map((item) => {
          let obj = {};
          Object.keys(item).map((data) => {
            if (item[data] == '' || item[data] == null) {
              obj[data] = '-';
            } else if (data == 'idEmpresa') {
              obj[data] = item[data].nomeFantasia;
            } else if (data == 'idRegra') {
              obj[data] = item[data].descricao
            } else {
              obj[data] = item[data];
            }

          })
          return obj;
        })
        this.table.items = arr;
        this.table.loading = false;
      },
        (error: HttpErrorResponse) => {
          console.log(error.error);
          this.table.items = [];
          this.loading = false;
        });
  };

}
