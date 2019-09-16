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
      { label: 'Salvar', action: () => {}},
      { label:'Voltar', icon:'po-icon po-icon-arrow-left', action: () => {(this.location.back())}},
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

  constValue: {
  isDisabled: boolean;
}

  editEmpresaForm: FormGroup = this.fb.group({
    idEmpresa:[''],
    cnpj:[''],
    nomeFantasia:[''],
    razaoSocial:[''],
    endereco:[''],
    admin:[''],
    telefone:[''],
    status:['']

  })

  constructor(
    private location: Location,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

}
