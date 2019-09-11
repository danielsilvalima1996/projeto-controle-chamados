import { Component } from '@angular/core';

import { PoMenuItem } from '@portinari/portinari-ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly menus: Array<PoMenuItem> = [
    { label: 'Cadastros', shortLabel: 'Cadastros', link: '/cadastros', icon: 'po-icon po-icon-document-filled' },
    { label: 'Chamados', shortLabel: 'Chamados', link: '/chamados', icon: 'po-icon po-icon-list' },
    { label: 'Settings', shortLabel: 'Settings', link: '/settings', icon: 'po-icon po-icon-settings' },
    // { label: '', shortLabel: '', link: '', icon: '' },
  ];

}
