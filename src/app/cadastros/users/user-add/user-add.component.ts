import { Component, OnInit } from '@angular/core';
import { PoPageAction, PoBreadcrumb, PoBreadcrumbItem, PoNotificationService, PoSelectOption, PoPageDefault } from '@portinari/portinari-ui';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { UserService } from 'src/app/services/cadastros/users/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EmpresaService } from 'src/app/services/cadastros/empresa/empresa.service';
import { PermissionsService } from 'src/app/services/cadastros/permissions/permissions.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  page: PoPageDefault = {
    actions: <PoPageAction[]>[
      { label: 'Salvar', action: () => { this.addUser() } },
      { label: 'Cancelar', action: () => { this.location.back() } },
    ],

    title: 'Adicionar Usuários',
    breadcrumb: <PoBreadcrumb>{
      items: <PoBreadcrumbItem[]>[
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Usuários' },
        { label: 'Adicionar Usuário' },
      ]
    },

  }

  selects = {
    ativoOptions: <PoSelectOption[]>[
      { label: 'ATIVO', value: 'true' },
      { label: 'INATIVO', value: 'false' }
    ],
    permission: <PoSelectOption[]>[],
    empresas: <PoSelectOption[]>[]
  }

  constValue = {
    loadingPage: false
  }

  useraddForm: FormGroup = this.fb.group({
    userName: ['', [Validators.required, Validators.pattern('^^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
    fullName: ['', [Validators.required, Validators.pattern('^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$'), Validators.minLength(8)]],
    password: ['', [Validators.required]],
    authorities: ['', []],
    permission: ['', [Validators.required]],
    idEmpresa: ['', [Validators.required]],
    roles: ['', []],
    enabled: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private notificationService: PoNotificationService,
    private userService: UserService,
    private permissionService: PermissionsService,
    private empresaService: EmpresaService
  ) { }

  ngOnInit() {
    this.useraddForm.valueChanges.subscribe((_) => {
      this.page.actions[0].disabled = this.useraddForm.invalid;
      console.log(this.useraddForm.invalid);
      
    })
    this.getPermission()
    this.getEmpresas()
  }

  getPermission() {
    this.permissionService
      .findAllActive()
      .subscribe((data: any) => {
        let arr: Array<any> = data;
        arr = arr.map((item: any) => {
          return <PoSelectOption>{ label: `${item.id} - ${item.description}`, value: item.id };
        })
        this.selects.permission = arr;
      })
  }

  getEmpresas() {
    this.empresaService
      .getEmpresa()
      .subscribe((data: any) => {
        let arr: Array<any> = data.content;
        arr = arr.map((item: any) => {
          return <PoSelectOption>{ label: `${item.id} - ${item.razaoSocial}`, value: item.id };
        })
        this.selects.empresas = arr;
      })
  }

  addUser() {
    this.constValue.loadingPage = true;

    if (this.useraddForm.invalid) {
      this.notificationService.warning('Formulário Inválido!');
      return;
    }
    else {
      
      let obj = {
        userName: this.useraddForm.controls.userName.value,
        fullName: this.useraddForm.controls.fullName.value,
        password: this.useraddForm.controls.password.value,
        permissions: [ { id: this.useraddForm.controls.permission.value}],
        idEmpresa: { id: this.useraddForm.controls.idEmpresa.value},
        authorities: [],
        roles: [],
      }
      console.log(obj);

      this.userService.addUser(obj).subscribe(() => {
        this.notificationService.success('Usuário Cadastrado com Sucesso!');
        this.location.back();
        this.constValue.loadingPage = false;
      },
        (error: HttpErrorResponse) => {
          this.constValue.loadingPage = false;
          this.notificationService.error('Erro no Cadastro do Usuário');
        }


      )
    }

  }

}
