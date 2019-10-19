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
      { label: 'Novo', icon: 'po-icon po-icon-company', url: 'empresa/add' },
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
      { property: 'id', label: 'ID', width: '50px' },
      { property: 'cnpj', label: 'CNPJ', width: '150px' },
      { property: 'razaoSocial', label: 'Razão Social', width: '120.5px' },
      { property: 'nomeFantasia', label: 'Nome Fantasia', width: '120.5px' },
      { property: 'endereco', label: 'Endereço', width: '150px' },
      { property: 'codigoTotvs', label: 'Codigo Totvs', width: '120px' },
      { property: 'admin', label: 'Contato', width: '100px' },
      { property: 'telefone', label: 'Telefone', width: '120px' },
      { property: 'celular', label: 'Celular', width: '120px' },
      { property: 'criado', label: 'Criado ', width: '100px', type: 'date', format: 'dd/MM/yyyy' },
      { property: 'modificado', label: 'Modificado ', width: '100px', type: 'date', format: 'dd/MM/yyyy' },
      { property: 'ativo', label: 'Ativo', width:'100px', type:'boolean'}
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
  }

  getUnSelected() {
    this.constValue.itemSelecionado = '';
  }

  getCompany(form?) {
    this.empresaService.getEmpresa(this.utilService.getParameters(form))
      .subscribe((data: any) => {
        let value: Array<any> = data.content;
        value = value.map((item: any) => {
          item.cnpj = this.utilService.formatarCnpjCpf(item.cnpj);
          item.telefone = this.utilService.mascaraDeTelefone2(item.telefone);
          item.celular = this.utilService.mascaraDeTelefone2(item.celular)
          return item;
        })

        this.table.items = value
      })

  }



}
