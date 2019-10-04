import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PoSelectOption, PoTableAction, PoTableColumn, PoPageDefault } from '@portinari/portinari-ui';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/services/cadastros/company/company.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {

  page: PoPageDefault = {
    title: 'Cadastro de Empresas',
    actions: [
      { label: 'Novo', icon: 'po-icon po-icon-company', url: 'empresa-list/add' },
      { label: 'Editar', action: () => {this.router.navigate(['edit', this.constValue.itemSelecionado],{relativeTo:this.route})}}
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
      { property: 'razaoSocial', label: 'Razão Social', width: '12.5%' },
      { property: 'nomeFantasia', label: 'Nome Fantasia', width: '12.5%' },
      { property: 'endereco', label: 'Endereço', width: '15%' },
      { property: 'codigoTotvs', label:'Codigo Totvs', width:'5%'},
      { property: 'admin', label:'Contato', width:'10%'},
      { property: 'telefone', label: 'Telefone', width: '10%' },
      { property: 'created', label: 'Criado ', width: '10%', type: 'date', format: 'dd/MM/yyyy' },
      { property: 'modified', label: 'Modificado ', width: '10%', type: 'date', format: 'dd/MM/yyyy' }
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

  constValue = {
    itemSelecionado:''
  }

  constructor(
    private fb: FormBuilder,
    private companyService : CompanyService,
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

  getSelected(event) {
    this.constValue.itemSelecionado = event.id;
    console.log(event.id)
    
  }



}
