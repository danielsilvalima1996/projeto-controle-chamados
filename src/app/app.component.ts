import { Component } from '@angular/core';

import { PoMenuItem } from '@portinari/portinari-ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly menus: Array<PoMenuItem> = [
    {
      label: 'Cadastros', shortLabel: 'Cadastros', icon: 'po-icon po-icon-document-filled',
      subItems: [
        { label: 'Analistas', shortLabel: 'Analistas', link: 'cadastros/analista-list', icon: 'po-icon po-icon-document-filled' },
        { label: 'Empresas', shortLabel: 'Empresas', link: 'cadastros/empresa-list', icon: 'po-icon po-icon-document-filled' },
      ]
    },
    { label: 'Chamados', shortLabel: 'Chamados', link: 'chamados/chamados-list', icon: 'po-icon po-icon-list' },
    {
      label: 'Configurações', shortLabel: 'Configurações', icon: 'po-icon po-icon-settings', subItems: [
        { label: 'Usuários', shortLabel: 'Usuários', link: 'settings/user-list', icon: 'po-icon po-icon-users' },
        { label: 'Regras', shortLabel: 'Regras', link: 'settings/role-list', icon: 'po-icon po-icon-minus' },
      ]
    },
    // { label: '', shortLabel: '', link: '', icon: '' },
  ];

}
