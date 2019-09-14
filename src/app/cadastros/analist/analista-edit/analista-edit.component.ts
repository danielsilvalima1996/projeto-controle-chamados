import { Component, OnInit } from '@angular/core';
import { PoPageDefault } from '@portinari/portinari-ui';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-analista-edit',
  templateUrl: './analista-edit.component.html',
  styleUrls: ['./analista-edit.component.css']
})
export class AnalistaEditComponent implements OnInit {

  page: PoPageDefault = {
    title: 'Editar Analista',
    actions: [
      { label:'Voltar', icon:'po-icon po-icon-arrow-left', action: () => {(this.location.back())}},
      { label: 'Salvar', action: () => {}}
    ],
    breadcrumb:{
      items: [
        { label:'Home'},
        { label: 'Cadastros' },
        { label: 'Analistas' },
        { label: 'Editar Analista'}
      ]
    }

  }

  editAnalistaForm: FormGroup = this.fb.group({
    idAnalista:[''],
    nomeAnalista: [''],
    emailAnalista:[''],
    senha: ['', ],
    status: ['', ]

  })

  constructor(
    private location: Location,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

}
