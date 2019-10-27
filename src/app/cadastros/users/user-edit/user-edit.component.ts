import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from 'src/app/services/cadastros/users/user.service';
import { PoSelectOption, PoNotificationService } from '@portinari/portinari-ui';
import { PermissionsService } from 'src/app/services/cadastros/permissions/permissions.service';
import { User } from 'src/app/interfaces/user.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  page = {
    title: 'Editar Usuário',
    actions: [
      { label: 'Salvar', action: () => { this.saveUser(this.editUserForm.value) } },
      // disabled: true,
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
    id: ''
  }

  editUserForm: FormGroup = this.fb.group({
    id: [''],
    idEmpresa: [''],
    userName: [''],
    password: [''],
    fullName: ['', [Validators.required, Validators.minLength(7)]],
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
    // this.page.actions[0].disabled = this.editUserForm.invalid;
    this.permissionService.findAllActive().subscribe((data: any) => {
      this.selects.permissoes = data.map((item: any) => {
        return { label: item.description, value: item.id }
      })
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
          permissions: data.permissions[0].description,
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
        console.log(obj);
        
        this.editUserForm.setValue(Object.assign({}, obj));

      })
  }

  saveUser(user: User) {
    if (this.editUserForm.invalid) {
      this.notification.warning('Formulário Inválido!');
      return;
    } else {
      this.userService
        .alterUser(user)
        .subscribe((data) => {
          this.notification.success('Usuário alterado com sucesso!');
          this.location.back();
        },
          (error: any) => {
            this.notification.error('Erro ao salvar usuário!');
          })
    }
  }
}
