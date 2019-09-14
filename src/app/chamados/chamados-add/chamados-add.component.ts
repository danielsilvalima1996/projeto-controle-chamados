import { Component, OnInit } from '@angular/core';
import { PoPageDefault } from '@portinari/portinari-ui';
import { Location } from '@angular/common';

@Component({
  selector: 'app-chamados-add',
  templateUrl: './chamados-add.component.html',
  styleUrls: ['./chamados-add.component.css']
})
export class ChamadosAddComponent implements OnInit {

  page: PoPageDefault = {
    title: 'Novo de Chamado',
    actions: [
      {
        label: 'Voltar', icon: 'po-icon po-icon-arrow-left', action: () => {
          this.location.back();
        }
      }
    ],
    breadcrumb: {
      items: [
        { label: 'Home' },
        { label: 'Novo Chamado' }
      ]
    }
  }

  constructor(
    private location: Location
  ) { }

  ngOnInit() {
  }

}
