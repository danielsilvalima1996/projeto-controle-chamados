import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from 'src/app/services/cadastros/users/user.service';
import { PoSelectOption, PoNotificationService } from '@portinari/portinari-ui';
import { PermissionsService } from 'src/app/services/cadastros/permissions/permissions.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  page = {
    title: 'Editar Usuário',
    actions: [
      { label: 'Salvar', disabled: true, action: () => { this.saveUser() } },
      { label: 'Voltar', icon: 'po-icon po-icon-arrow-left', action: () => { (this.location.back()) } },
    ],
    breadcrumb: {
      items: [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Usuários' },
        { label: 'Editar Usuário' }
      ]
    }

  }

  selects = {
    ativoOptions: <PoSelectOption[]>[
      { label: 'ATIVA', value: 'true' },
      { label: 'INATIVA', value: 'false' }
    ],
    permissoes: <PoSelectOption[]>[]
  }

  constValue = {
    id: '',
    loadingPage: false,
    permissions: <number>0,
    authorities: [],
    empresa: <any>[]
  }

  editUserForm: FormGroup = this.fb.group({
    id: [''],
    idEmpresa: [''],
    userName: [''],
    password: [''],
    fullName: ['', [Validators.required]],
    permissions: ['', [Validators.required]],
    enabled: ['', [Validators.required]],
    created: [''],
    modified: [''],
    accountNonExpired: [''],
    accountNonLocked: [''],
    credentialsNonExpired: [''],
    authorities: [''],
    roles: [''],
    username: ['']
  })

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private permissionService: PermissionsService,
    private notification: PoNotificationService
  ) { }


  ngOnInit() {
    this.editUserForm.valueChanges.subscribe((_) => {
      this.page.actions[0].disabled = this.editUserForm.invalid;
    })
    this.permissionService.findAllActive(this.constValue.permissions)
      .subscribe((data: any) => {
        let arr = data.map((item) => {
          return <PoSelectOption>{ label: item.description, value: item.id }
        })
        this.selects.permissoes = arr;
      })

    this.route.paramMap
      .subscribe((params: ParamMap) => {
        this.constValue.id = params.get('id');
      })
    this.findById(this.constValue.id)

  }

  private findById(id) {
    this.userService
      .findById(id)
      .subscribe((data) => {

        let obj = {
          id: data.id,
          idEmpresa: data.idEmpresa.nomeFantasia,
          userName: data.userName,
          password: data.password,
          fullName: data.fullName,
          permissions: data.permissions[0].id,
          enabled: data.enabled,
          created: new Date(data.created),
          modified: new Date(data.modified),
          accountNonExpired: data.accountNonExpired,
          accountNonLocked: data.accountNonLocked,
          credentialsNonExpired: data.credentialsNonExpired,
          authorities: data.authorities,
          roles: data.roles,
          username: data.username

        }

        this.constValue.empresa = data.idEmpresa
        this.constValue.permissions = data.permissions[0].id;
        this.constValue.authorities = data.authorities;
        console.log(obj);

        this.editUserForm.setValue(Object.assign({}, obj));

      })
  }

  saveUser() {
    this.constValue.loadingPage = true;

    if (this.editUserForm.invalid) {
      this.notification.warning('Formulário Inválido!');
      return;
    }
    else {

      let obj = {
        id: this.constValue.id,
        userName: this.editUserForm.controls.userName.value,
        fullName: this.editUserForm.controls.fullName.value,
        password: this.editUserForm.controls.password.value,
        permissions: [{ id: this.constValue.permissions }],
        idEmpresa: this.constValue.empresa,
        authorities: [],
        roles: [this.editUserForm.controls.permissions.value],
        enabled: this.editUserForm.controls.enabled.value,
        created: new Date(this.editUserForm.controls.created.value),
        modified: new Date(this.editUserForm.controls.modified.value),
        accountNonExpired: true,
        accountNonLocked: true,
        credentialsNonExpired: true,
        username: ''
      }

      this.userService.addUser(obj).subscribe(() => {
        this.notification.success('Usuário Cadastrado com Sucesso!');
        this.location.back();
        this.constValue.loadingPage = false;
      },
        (error: HttpErrorResponse) => {
          this.constValue.loadingPage = false;
          this.notification.error('Erro no Cadastro do Usuário');
        }


      )
    }

  }

}
