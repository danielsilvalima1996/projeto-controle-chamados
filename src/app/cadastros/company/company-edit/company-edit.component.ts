import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { PoPageDefault } from '@portinari/portinari-ui';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {

  page: PoPageDefault = {
    title: 'Editar Empresa',
    actions: [
      { label:'Voltar', icon:'po-icon po-icon-arrow-left', action: () => {(this.location.back())}},
      { label: 'Salvar', action: () => {}}
    ],
    breadcrumb:{
      items: [
        { label:'Home'},
        { label: 'Cadastros' },
        { label: 'Empresas' },
        { label: 'Editar Empresa'}
      ]
    }

  }

  editEmpresaForm: FormGroup = this.fb.group({
    idEmpresa:[''],
    cnpj:[''],
    nomeFantasia:[''],
    razaoSocial:[''],
    endereco:[''],
    admin:[''],
    telefone:[''],
    created:[''],
    modified:[''],
    status:['']

  })

  constructor(
    private location: Location,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

}
