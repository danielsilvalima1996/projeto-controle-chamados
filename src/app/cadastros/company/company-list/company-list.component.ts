import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PoSelectOption, PoTableAction, PoTableColumn, PoPageDefault } from '@portinari/portinari-ui';
import { CompanyListService } from 'src/app/services/company/company-list.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {

  page: PoPageDefault = {
    title: 'Cadastro de Empresas',
    actions: [
      { label: 'Novo', icon: 'po-icon po-icon-company', url: 'empresa-list/add' }
    ],
    breadcrumb: {
      items: [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Empresas' }
      ]
    }
  }

  table = {
    columns: <PoTableColumn[]>[
      { property: 'id', label: 'ID', width: '5%' },
      { property:'cnpj', label: 'CNPJ', width:'10%'},
      { property: 'nomeFantasia', label: 'Nome Fantasia', width: '15%' },
      { property: 'razaoSocial', label: 'Razão Social', width: '15%' },
      { property: 'endereco', label: 'Endereço', width: '15%' },
      { property: 'admin', label:'Contato', width:'10%'},
      { property: 'telefone', label: 'Telefone', width: '10%' },
      { property: 'created', label: 'Criado ', width: '10%', type: 'date', format: 'dd/MM/yyyy' },
      { property: 'modified', label: 'Modificado ', width: '10%', type: 'date', format: 'dd/MM/yyyy' }
    ],
    actions: <PoTableAction[]>[
      { label: 'Visualizar', url: 'empresa-list/view:id' },
      { label: 'Editar', url: 'empresa-list/edit:id' },
    ],
    items: [],
    height: 0,
    loading: false
  }

  companyform: FormGroup = this.fb.group({
    filtro: ['', [Validators.required]],
    pesquisa:[ '']
  })

  selects = {
    pesquisa: <PoSelectOption[]>[
      { label: 'ID', value: 'id' },
      { label: 'NOME FANTASIA', value: 'nomeFantasia' },
      { label: 'RAZÃO SOCIAL', value: 'razaoSocial' },
      { label: 'CONTATO', value: 'contato' }
      
    ]
  }

  constructor(
    private fb: FormBuilder,
    private companyService : CompanyListService,
    private router: Router,
    private route: ActivatedRoute
  ) { }



  ngOnInit() {
    this.getCompany()
  }

  private getCompany() {
    this.companyService.getCompany()
      .subscribe((data:any) => {
        this.table.items = data
      })

  }

  searchdata() {
  }



}
