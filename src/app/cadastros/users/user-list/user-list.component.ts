import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoSelectOption, PoTableColumn, PoTableAction, PoPageAction, PoBreadcrumb, PoBreadcrumbItem, PoNotificationService } from '@portinari/portinari-ui';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/cadastros/users/user.service';
import { UtilService } from 'src/app/services/utils/util-service/util.service';
import { ErrorSpringBoot } from 'src/app/interfaces/ErrorSpringBoot.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  page = {
    actions: <PoPageAction[]>[
      { label: 'Novo', icon: 'po-icon po-icon-user-add', url: 'user/add' },
      { label: 'Editar', action: () => { this.editarUsuario() } }
    ],

    title: 'Cadastro de Usuários',
    breadcrumb: <PoBreadcrumb>{
      items: <PoBreadcrumbItem[]>[
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Usuários' }
      ]
    }
  }

  table = {
    columns: <PoTableColumn[]>[
      { property: 'id', label: 'ID', width: '10%' },
      { property: 'fullName', label: 'Nome Completo', width: '15%' },
      { property: 'userName', label: 'E-mail', width: '25%' },
      { property: 'idEmpresa', label: 'ID Empresa', width: '10%' },
      { property: 'permissions', label: 'Permissões', width: '10%' },
      { property: 'created', label: 'Criado ', width: '10%', type: 'date', format: 'dd/MM/yyyy' },
      { property: 'modified', label: 'Modificado ', width: '10%', type: 'date', format: 'dd/MM/yyyy' },
      { property: 'enabled', label: 'Ativo', width: '10%', type: 'boolean' }
    ],
    items: [],
    height: 0,
    loading: false
  }



  userform: FormGroup = this.fb.group({
    filtro: ['', [Validators.required]],
    pesquisa: ['']
  })

  selects = {
    pesquisa: <PoSelectOption[]>[
      { label: 'ID', value: 'id' },
      { label: 'E-MAIL', value: 'userName' },
      { label: 'NOME', value: 'fullName' },
      { label: 'ATIVO', value: 'enabled' },
      { label: 'ID EMPRESA', value: 'idEmpresa' },
    ],
    filtro: <PoSelectOption[]>[
      { label: 'SIM', value: 'true' },
      { label: 'NÃO', value: 'false' }
    ]
  }

  pagination = {
    totalItems: 0,
    itemsPerPage: 30,
    currentPage: 1
  }

  constValue = {
    selecionado: '',
    input: <Boolean>true,
    select: <Boolean>false,
  }

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
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
      })
    this.getUser(this.userform.value);
  }

  get controls() {
    return this.userform.controls;
  }

  tipoForm(tipo) {
    if (tipo == 'enabled') {
      this.constValue.input = false;
      this.constValue.select = true;
    } else {
      this.constValue.input = true;
      this.constValue.select = false;
    }
  }

  getUser(parameters?: any) {
    this.table.loading = true;
    this.userService
      .getUser(this.utilService.getParameters(parameters))
      .subscribe((data) => {
        let arr: Array<any> = data.content.map((item) => {
          let obj = {};
          Object.keys(item).map((data) => {
            if (item[data] == '' || item[data] == null) {
              obj[data] = '-';
            } else if (data == 'idEmpresa') {
              obj[data] = item[data].nomeFantasia;
            } else if (data == 'permissions') {
              obj[data] = item[data][0].description
            } else {
              obj[data] = item[data];
            }

          })
          return obj;
        })

        this.table.loading = false;
        this.table.items = arr;
      },
        (error: ErrorSpringBoot) => {
          this.notificationService.error(error.message);
        })
  }

  getSelected(event) {
    this.constValue.selecionado = event.id;

  }

  getUnSelected() {
    this.constValue.selecionado = ''
  }

  editarUsuario() {
    if (this.constValue.selecionado == null || this.constValue.selecionado == '') {
      this.notificationService.warning('Selecione um Usuário para editar!');
      return;
    } else {
      this.router.navigate(['edit', this.constValue.selecionado], { relativeTo: this.route });
    }
  }

}
