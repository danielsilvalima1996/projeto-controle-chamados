import { Component, OnInit } from '@angular/core';
import { PoPageDefault } from '@portinari/portinari-ui';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  page:  PoPageDefault = {

    title:'Usuários',
    



  }

  constructor() { }

  ngOnInit() {
  }

}
