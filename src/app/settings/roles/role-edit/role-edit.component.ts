import { Component, OnInit } from '@angular/core';
import { PoPageDefault } from '@portinari/portinari-ui';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  roleEditForm: FormGroup = this.fb.group({
    id:[''],
    nomeRegra:['']

  })


  constructor(
    private location: Location,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

}
