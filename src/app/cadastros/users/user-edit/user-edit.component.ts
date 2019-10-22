import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from 'src/app/services/cadastros/users/user.service';
import { PoSelectOption } from '@portinari/portinari-ui';
import { PermissionsService } from 'src/app/services/cadastros/permissions/permissions.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  page = {
    title: 'Editar Usuário',
    actions: [
      { label: 'Salvar', disabled:true, action: () => { } },
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
    statusOptions: <PoSelectOption[]> [
      { label: 'ATIVA', value: 'true' },
      { label: 'INATIVA', value: 'false' }
    ],
    permissoes:<PoSelectOption[]>[]
  }

  constValue = {
    id: ''
  }

  editUserForm: FormGroup = this.fb.group({
    id: [''],
    idEmpresa: [''],
    userName: [''],
    email: [''],
    fullName: ['', [Validators.required,Validators.minLength(7)]],
    permissions: ['',[Validators.required]],
    enabled: ['', [Validators.required]],
    created:[''],
    modified:['']

  })

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService:UserService,
    private permissionService:PermissionsService
  ) { }


  ngOnInit() {
    this.page.actions[0].disabled = this.editUserForm.invalid;
    this.permissionService.findAll().subscribe((data: any) => {
      this.selects.permissoes = data.map((item)=>{
        return { label:item.name, value:item.id}
      })
    })
    
  //   this.route.paramMap
  //     .subscribe((params: ParamMap) => {
  //       this.constValue.id = params.get('id');

       
  // }}

}
}
