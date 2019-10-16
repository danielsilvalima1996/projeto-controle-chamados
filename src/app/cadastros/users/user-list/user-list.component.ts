import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoSelectOption, PoTableColumn, PoTableAction, PoPageAction, PoBreadcrumb, PoBreadcrumbItem } from '@portinari/portinari-ui';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/cadastros/users/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  page = {
    actions: <PoPageAction[]>[
      { label: 'Novo', icon: 'po-icon po-icon-user-add', url: 'user-list/add' },
      { label: 'Editar', action: () => {this.router.navigate(['edit', this.constValue.selecionado], {relativeTo:this.route})}}
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
      { property: 'username', label: 'Nome', width: '15%' },
      { property: 'email', label: 'E-mail', width: '25%' },
      { property: 'idEmpresa', label: 'ID Empresa', width: '10%' },
      { property: 'created', label: 'Criado ', width: '10%', type: 'date', format: 'dd/MM/yyyy' },
      { property: 'modified', label: 'Modificado ', width: '10%', type: 'date', format: 'dd/MM/yyyy' },
      { property: 'ativo', label: 'Ativo', width: '10%', type:'boolean' }
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
      { label: 'USUÁRIO', value: 'username' },
      { label: 'E-MAIL', value:'email'},
      { label: 'ATIVO', value: 'active' },
      { label: 'ID EMPRESA', value: 'idEmpresa'},
      { label: 'ID ROLE', value: 'idRole'}
    ],
    filtro: <PoSelectOption[]>[
      { label: 'SIM', value: 'true' },
      { label: 'NÃO', value: 'false' }
    ]
  }

  constValue = {
    selecionado:'',
    input: <Boolean>true,
    select:<Boolean>false,
  }

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }



  ngOnInit() {
    this.controls.pesquisa
      .valueChanges.subscribe((data) => {
        this.tipoForm(data);
      })
    this.getUser();
  }

  get controls() {
    return this.userform.controls;
  }

  tipoForm(tipo) {
    if (tipo == 'active') {
      this.constValue.input = false;
      this.constValue.select = true;
    } else {
      this.constValue.input = true;
      this.constValue.select = false;
    }
  }

  private getUser() {
    this.userService.getUser()
      .subscribe((data:any) => {
        this.table.items = data
      })
  }

  searchData() {

  }

  getSelected(event) {
    this.constValue.selecionado = event.id;
    
  }

}
