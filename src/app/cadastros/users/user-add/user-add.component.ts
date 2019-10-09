import { Component, OnInit } from '@angular/core';
import { PoPageAction, PoBreadcrumb, PoBreadcrumbItem } from '@portinari/portinari-ui';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  page = {
    actions: <PoPageAction[]>[
      { label: 'Salvar', disabled:true, action: () => { } },
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
    statusOptions: [
      { label: 'ATIVO', value: true },
      { label: 'INATIVO', value: false }
    ]
  }

  useraddForm: FormGroup = this.fb.group({
    userName: ['', [Validators.required, Validators.pattern('^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$'), Validators.minLength(10)]],
    userEmail: ['', [Validators.required, Validators.pattern('^^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
    senha: ['', [Validators.required,Validators.minLength(7)]],
    status: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private location: Location
  ) { }

  ngOnInit() {
    this.useraddForm.valueChanges.subscribe((_) => {
      this.page.actions[0].disabled = this.useraddForm.invalid;
    })
  }

}
