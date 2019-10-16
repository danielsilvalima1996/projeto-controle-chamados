import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PoSelectOption, PoTableAction, PoTableColumn, PoPageDefault } from '@portinari/portinari-ui';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaService } from 'src/app/services/cadastros/empresa/empresa.service';
import { UtilService } from 'src/app/services/utils/util-service/util.service';

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
      { label: 'Editar', action: () => { this.router.navigate(['edit', this.constValue.itemSelecionado], { relativeTo: this.route }) } }
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
      { property: 'cnpj', label: 'CNPJ', width: '10%' },
      { property: 'razaoSocial', label: 'Razão Social', width: '12.5%' },
      { property: 'nomeFantasia', label: 'Nome Fantasia', width: '12.5%' },
      { property: 'endereco', label: 'Endereço', width: '10%' },
      { property: 'codigoTotvs', label: 'Codigo Totvs', width: '5%' },
      { property: 'admin', label: 'Contato', width: '10%' },
      { property: 'telefone', label: 'Telefone', width: '10%' },
      { property: 'criado', label: 'Criado ', width: '10%', type: 'date', format: 'dd/MM/yyyy' },
      { property: 'modificado', label: 'Modificado ', width: '10%', type: 'date', format: 'dd/MM/yyyy' },
      { property: 'ativo', label: 'Ativo', width:'5%'}
    ],
    items: [],
    height: 0,
    loading: false
  }

  companyform: FormGroup = this.fb.group({
    filtro: ['', []],
    pesquisa: ['']
  })

  selects = {
    pesquisa: <PoSelectOption[]>[
      { label: 'ID', value: 'id' },
      { label: 'NOME FANTASIA', value: 'nomeFantasia' },
      { label: 'ATIVO', value: 'active' }
    ],
    filtro: <PoSelectOption[]>[
      { label: 'SIM', value: 'true' },
      { label: 'NÃO', value: 'false' }
    ]
  }

  constValue = {
    itemSelecionado: '',
    input: <Boolean>true,
    select: <Boolean>false
  }

  constructor(
    private fb: FormBuilder,
    private empresaService: EmpresaService,
    private router: Router,
    private route: ActivatedRoute,
    private utilService: UtilService
  ) { }



  ngOnInit() {
    this.controls.pesquisa.
    valueChanges.subscribe((data)=>{
      this.tipoForm(data);
    })
    this.getCompany(this.companyform.value)
  }

   getCompany(form?) {
    this.empresaService.getEmpresa(this.utilService.getParameters(form))
      .subscribe((data: any) => {
        this.table.items = data.content
      })

  }

  get controls() {
    return this.companyform.controls
  }

  tipoForm(tipo) {
    if (tipo == 'active') {
      this.constValue.input = false;
      this.constValue.select = true;
    } else {
      this.constValue.input = true;
      this.constValue.select = false;
    }
  }

  getSelected(event) {
    this.constValue.itemSelecionado = event.id;
    console.log(event.id)

  }



}
