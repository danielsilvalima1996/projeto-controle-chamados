import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CompanyService } from 'src/app/services/cadastros/company/company.service';
import { RolesService } from 'src/app/services/cadastros/roles/roles.service';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {

  testingForm: FormGroup = this.fb.group({
    data: ['', []],
    juros: ['', []],
    total: ['', []]
  })

  constructor(
    private rolesListService: RolesService,
    private companyListService: CompanyService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    this.controls.data.valueChanges.subscribe((data) => {
      console.log(data);
      

    })

  }

  get controls() {
    return this.testingForm.controls;
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
