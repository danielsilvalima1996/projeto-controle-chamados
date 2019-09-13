import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PoTableColumn, PoPageAction, PoBreadcrumb, PoBreadcrumbItem } from '@portinari/portinari-ui';

@Component({
  selector: 'app-analista-list',
  templateUrl: './analista-list.component.html',
  styleUrls: ['./analista-list.component.css']
})
export class AnalistaListComponent implements OnInit {

  page = {
    actions: <PoPageAction[]>[
      {label: 'New', icon:'po-icon po-icon-user-add', action:() => ('')}
    ],

    title: 'Cadastro de Analistas',
    breadcrumb: <PoBreadcrumb>{
      items: <PoBreadcrumbItem[]>[
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Analistas' }
      ]
    }
  }

  table = {
    columns: <PoTableColumn[]>[
      { property: 'id', label: 'ID Analista', width: '20%' },
      { property: 'nome', label: 'Nome', width: '20%' },
      { property: 'email', label: 'E-mail', width: '20%' },
      { property: 'created', label: 'Criado em ', width: '20%' },
      { property: 'modified', label: 'Modificado em ', width: '20%' },
    ],
    items: [],
    height: 0,
    loading: false
  }

  analistaform: FormGroup = this.fb.group({
    filter: ['',[Validators.required]],
  })

  constructor(
    private fb: FormBuilder
  ) { }



  ngOnInit() {
  }

}
