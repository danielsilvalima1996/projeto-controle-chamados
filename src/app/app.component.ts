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
        { label: 'Analistas', shortLabel: 'Analistas', link: 'cadastros/analista', icon: 'po-icon po-icon-document-filled' },
        { label: 'Empresas', shortLabel: 'Empresas', link: 'cadastros/empresa', icon: 'po-icon po-icon-document-filled' },
        { label: 'Usuários', shortLabel: 'Usuários', link: 'cadastros/user', icon: 'po-icon po-icon-users' },
        { label: 'Permissões', shortLabel: 'Permissões', link: 'cadastros/permission', icon: 'po-icon po-icon-minus' },
        { label: 'Tipo Chamado', shortLabel: 'Tipo Chamado', link: 'cadastros/tipo-chamado', icon: 'po-icon po-icon-minus' },
        { label: 'SubTipo Chamado', shortLabel: 'SubTipo Chamado', link: 'cadastros/subtipo-chamado', icon: 'po-icon po-icon-minus' },
      ]
    },
    {
      label: 'Chamados', shortLabel: 'Chamados', icon: 'po-icon po-icon-list', subItems: [
        { label: 'Externo', shortLabel: 'Externo', link: 'chamados/externo', icon: 'po-icon po-icon-minus' },
        { label: 'Interno', shortLabel: 'Interno', link: 'chamados/interno', icon: 'po-icon po-icon-minus' }
      ]
    },
    { label: 'Testing', shortLabel: 'Testing', icon: 'po-icon po-icon-list', link: 'testing' }
    // { label: '', shortLabel: '', link: '', icon: '' },
  ];

}
