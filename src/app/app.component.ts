import { Component } from '@angular/core';

import { PoMenuItem } from '@portinari/portinari-ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly menus: Array<PoMenuItem> = [
    { label: 'Cadastros', shortLabel: 'Cad', link: '/cadastros', icon: 'po-icon po-icon-document-filled' },
    // { label: '', shortLabel: '', link: '', icon: '' },
    // { label: '', shortLabel: '', link: '', icon: '' },
  ];

  private onClick() {
    alert('Clicked in menu item')
  }

}
