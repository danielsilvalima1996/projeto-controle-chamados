import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoSelectOption } from '@portinari/portinari-ui';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RolesService } from 'src/app/services/cadastros/roles/roles.service';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.css']
})
export class RoleEditComponent implements OnInit {

  page: PoPageDefault = {

    title: 'Editar Regras',
    actions: [
      { label: 'Salvar', action: () => {}},
      { label:'Voltar', icon:'po-icon po-icon-arrow-left', action: () => {(this.location.back())}},
    ],
    breadcrumb:
    {
      items: [
        { label: 'Home' },
        { label: 'Configurações' },
        { label: 'Regras' },
        { label: 'Editar Regras' }
      ]
    }

  }

    selects = {
    statusOptions:[
        { label: 'ATIVO', value: true },
        { label: 'INATIVO', value: false }
      ]
  }

  roleEditForm: FormGroup = this.fb.group({
    id:[''],
    nome:[''],
    active:['']

  })

  constValue = {
    action:'',
    roleId:''
  }


  constructor(
    private location: Location,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private roleService: RolesService
  ) { }

  ngOnInit() {
    this.route.paramMap
    .subscribe((params:ParamMap)=>{
      this.constValue.action = params.get('action');
      this.constValue.roleId = params.get('id');

      this.roleService.getRoles()
      .subscribe((data)=>{
        // let value = data
        this.roleEditForm.setValue(Object.assign({}, this.constValue.action,this.constValue.roleId))
      })

    })
  }

}
