import { Component, OnInit } from '@angular/core';
import { RolesListService } from 'src/app/services/cadastros/roles/roles-list.service';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {

  constructor(
    private rolesListService: RolesListService
  ) { }

  ngOnInit() {
    this.getRole();

  }

  getRole(){
    this.rolesListService.getRoles().subscribe((data) => {
      let dados = data;
      console.log(dados);
      
    })
  }

}
