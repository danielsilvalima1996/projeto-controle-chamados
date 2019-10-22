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
    permission:<PoSelectOption[]>[],
    empresas:<PoSelectOption[]>[]
  }

  useraddForm: FormGroup = this.fb.group({
    userName: ['', [Validators.required, Validators.pattern('^^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
    fullName:['',Validators.required,Validators.minLength(6)],
    password: ['', [Validators.required]],
    authorities: ['', [Validators.required]],
    permission:['',[Validators.required]],
    idEmpresa:['',[Validators.required]],
    roles:['',[Validators.required]],
    enabled:['',[Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private notificationService: PoNotificationService,
    private userService: UserService,
    private permissionService: PermissionsService ,
    private empresaService: EmpresaService
  ) { }

  ngOnInit() {
    this.useraddForm.valueChanges.subscribe((_) => {
      this.page.actions[0].disabled = this.useraddForm.invalid;
    })
    this.getPermission()
    this.getEmpresas()
  }

  getPermission() {
    this.permissionService
      .findAllActive()
      .subscribe((data: any) => {
        let arr: Array<any> = data;
        console.log(arr);
        
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
    if (this.useraddForm.invalid) {
      this.notificationService.warning('Formulário Inválido!');
      return;
    }
    else {
      this.userService
        .addUser(this.useraddForm.value)
        .subscribe((data) => {
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
