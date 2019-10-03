import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  page = {
    title: 'Editar Usuário',
    actions: [
      { label: 'Salvar', action: () => { } },
      { label: 'Voltar', icon: 'po-icon po-icon-arrow-left', action: () => { (this.location.back()) } },
    ],
    breadcrumb: {
      items: [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Usuários' },
        { label: 'Editar Usuário' }
      ]
    },
    statusOptions: [
      { label: 'ATIVO', value: true },
      { label: 'INATIVO', value: false }
    ],
    regrasOptions: [
      { label: 'ANALISTA', value: '1' },
      { label: 'ADMINISTRADOR', value: '2' },
      { label: 'AUXILIAR', value: '3' }
    ]

  }

  constValue = {
    userId: ''
  }

  editUserForm: FormGroup = this.fb.group({
    userId: [''],
    companyId: [''],
    userName: [''],
    userEmail: [''],
    senha: ['', [Validators.minLength(7)]],
    regras: [''],
    status: ['', [Validators.required]],

  })

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { }


  ngOnInit() {
    this.route.paramMap
      .subscribe((params: ParamMap) => {
        this.constValue.userId = params.get('userId');

      })
  }

}
