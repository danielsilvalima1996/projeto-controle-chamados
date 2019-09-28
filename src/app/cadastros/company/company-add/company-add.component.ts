import { Component, OnInit } from '@angular/core';
import { PoPageDefault } from '@portinari/portinari-ui';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
      { label: 'ATIVO', value: true },
      { label: 'INATIVO', value: false }
    ]
  }


  companyaddForm: FormGroup = this.fb.group({
    cnpj:['',[Validators.required]],
    nomeFantasia:['',[Validators.required]],
    razaoSocial:['',[Validators.required]],
    endereco:['',[Validators.required]],
    admin:['',[Validators.required]],
    telefone:['',[Validators.required]],
    created:['',[Validators.required]],
    modified:['',[Validators.required]],
    status:['',[Validators.required]]

  });

  constructor(
    private fb: FormBuilder,
    private location: Location
  ) { }

  ngOnInit() {
  }

}

