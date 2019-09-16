import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { PoPageAction, PoBreadcrumbItem, PoBreadcrumb } from '@portinari/portinari-ui';

@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html',
  styleUrls: ['./role-add.component.css']
})
export class RoleAddComponent implements OnInit {

  page = {
    actions: <PoPageAction[]>[
      { label: 'Salvar', action: () => { } },
      { label: 'Cancelar', action: () => { this.location.back() } },
    ],

    title: 'Cadastro de Regra',
    breadcrumb: <PoBreadcrumb>{
      items: <PoBreadcrumbItem[]>[
        { label: 'Home' },
        { label: 'Configurações' },
        { label: 'Regras' },
        { label: 'Adicionar Regras' },
      ]
    },
    statusOptions: [
      { label: 'Ativa', value: true },
      { label: 'Inativa', value: false }
    ]
  }

  roleaddForm: FormGroup = this.fb.group({
    nomeRegra: ['', [Validators.required, Validators.pattern('^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$'), Validators.minLength(3)]],
    status: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private location: Location
  ) { }

  ngOnInit() {
  }

}
