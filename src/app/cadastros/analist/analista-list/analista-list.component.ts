import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PoTableColumn } from '@portinari/portinari-ui';

@Component({
  selector: 'app-analista-list',
  templateUrl: './analista-list.component.html',
  styleUrls: ['./analista-list.component.css']
})
export class AnalistaListComponent implements OnInit {

  page: {
    title: 'Cadastro de Analistas',
  }

  table = {
    columns: <PoTableColumn[]>[
      { property: 'id', label: 'ID Analista', width: '25%' },
      { property: 'nome', label: 'Nome', width: '25%' },
      { property: 'email', label: 'E-mail', width: '25%' },
      { property: 'outros', label: 'Outros', width: '25%' },
    ],
    items: [],
    height: 0,
    loading: false
  }

  analistaform = this.fb.group({
    name: [''],
    id: [''],
  })

  constructor(
    private fb: FormBuilder
  ) { }



  ngOnInit() {
  }

}
