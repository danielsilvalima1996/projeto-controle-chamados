import { Component, OnInit } from '@angular/core';
import { PoPageDefault } from '@portinari/portinari-ui';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-company-add',
  templateUrl: './company-add.component.html',
  styleUrls: ['./company-add.component.css']
})
export class CompanyAddComponent implements OnInit {

  page = {
    actions: [
      { label: 'Salvar', action: () => { } },
      { label: 'Cancelar', action: () => { this.location.back() } },
    ],

    title: 'Cadastro de Empresas',
    breadcrumb: {
      items: [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Empresas' },
        { label: 'Adicionar Empresas' },
      ]
    },
    statusOptions: [
      { label: 'Ativo', value: true },
      { label: 'Inativo', value: false }
    ]
  }

  


  companyaddForm: FormGroup = this.fb.group({
    cnpj:[''],
    nomeFantasia:[''],
    razaoSocial:[''],
    endereco:[''],
    admin:[''],
    telefone:[''],
    created:[''],
    modified:[''],
    status:['']

  });

  constructor(
    private fb: FormBuilder,
    private location: Location
  ) { }

  ngOnInit() {
  }

}

