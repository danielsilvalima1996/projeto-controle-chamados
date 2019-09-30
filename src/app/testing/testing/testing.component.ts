import { Component, OnInit } from '@angular/core';
import { RolesListService } from 'src/app/services/cadastros/roles/roles-list.service';
import { CompanyListService } from 'src/app/services/cadastros/company/company-list.service';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {

  constructor(
    private rolesListService: RolesListService,
    private companyListService: CompanyListService
  ) { }

  ngOnInit() {
    this.getCompany();
    this.getRole();

  }

  getRole(){
    this.rolesListService.getRoles().subscribe((data) => {
      let dados = data;
      console.log(dados);
    })
  }

  getCompany() {
    this.companyListService.getCompany().subscribe((data) => {
      console.log(data);
      
    })
  }

}
