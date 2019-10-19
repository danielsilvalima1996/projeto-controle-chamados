import { Component, OnInit } from '@angular/core';
import { PoPageAction, PoBreadcrumb, PoBreadcrumbItem, PoNotificationService, PoSelectOption, PoPageDefault } from '@portinari/portinari-ui';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { UserService } from 'src/app/services/cadastros/users/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RolesService } from 'src/app/services/cadastros/roles/roles.service';
import { EmpresaService } from 'src/app/services/cadastros/empresa/empresa.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  page : PoPageDefault = {
    actions: <PoPageAction[]>[
      { label: 'Salvar', disabled:true, action: () => { this.addUser()} },
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
    statusOptions: <PoSelectOption[]> [
      { label: 'ATIVO', value: 'true' },
      { label: 'INATIVO', value: 'false' }
    ],
    roleOptions:<PoSelectOption[]>[],
    empresas:<PoSelectOption[]>[]
  }

  useraddForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.pattern('^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$'), Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.pattern('^^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
    password: ['', [Validators.required,Validators.minLength(5)]],
    active: ['', [Validators.required]],
    role:['',[Validators.required]],
    idEmpresa:['',[Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private notificationService: PoNotificationService,
    private userService: UserService,
    private roleService: RolesService,
    private empresaService: EmpresaService
  ) { }

  ngOnInit() {
    this.useraddForm.valueChanges.subscribe((_) => {
      this.page.actions[0].disabled = this.useraddForm.invalid;
    })
    this.getRole()
    this.getEmpresas()
  }

  getRole() {
    this.roleService
      .getRoles()
      .subscribe((data: any) => {
        let arr: Array<any> = data.content; // chumbado ----  data.content no original
        arr = arr.map((item: any) => {
          return <PoSelectOption>{ label: `${item.id} - ${item.nome}`, value: item.id };
        })
        this.selects.roleOptions = arr;
      })
  }

  getEmpresas() {
    this.empresaService
      .getEmpresa()
      .subscribe((data: any) => {
        let arr: Array<any> = data.content; // chumbado ----  data.content no original
        arr = arr.map((item: any) => {
          return <PoSelectOption>{ label: `${item.id} - ${item.razaoSocial}`, value: item.id };
        })
        this.selects.empresas = arr;
      })
  }

  addUser() {
    if (this.useraddForm.invalid) {
      this.notificationService.warning('Formulário Inválido!');
      return;
    }
    else {
      this.userService
        .addUser(this.useraddForm.value)
        .subscribe((data) => {
          console.log(data);
          this.notificationService.success('Usuário Cadastrado com Sucesso');
          this.location.back();
          
          
        },
          (error: HttpErrorResponse) => {
            this.notificationService.error(error.error.meta.message);
          }
        );
    }
  }

}
