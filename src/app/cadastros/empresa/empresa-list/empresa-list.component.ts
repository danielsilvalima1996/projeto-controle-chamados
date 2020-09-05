import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/utils/util-service/util.service';
import { PoPageDefault, PoTableColumn, PoSelectOption, PoNotificationService } from '@po-ui/ng-components';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EmpresaService } from 'src/app/services/cadastros/empresa/empresa.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Pagination } from 'src/app/interfaces/pagination.model';

@Component({
  selector: 'app-empresa-list',
  templateUrl: './empresa-list.component.html',
  styleUrls: ['./empresa-list.component.css']
})
export class EmpresaListComponent implements OnInit {

  page: PoPageDefault = {
    title: 'Cadastro de Empresas',
    actions: [
      { label: 'Novo', icon: 'po-icon po-icon-company', url: 'empresa/add' },
      { label: 'Editar', action: () => { this.editarEmpresa() } },
      { label: 'Visualizar', action: () => { this.viewEmpresa() } }
    ],
    breadcrumb: {
      items: [
        { label: 'Dashboard' },
        { label: 'Cadastros' },
        { label: 'Empresas' }
      ]
    }
  }

  table = {
    columns: <PoTableColumn[]>[
      { property: 'id', label: 'ID', width: '50px' },
      { property: 'cnpj', label: 'CNPJ', width: '150px' },
      { property: 'razaoSocial', label: 'Razão Social', width: '200px' },
      { property: 'nomeFantasia', label: 'Nome Fantasia', width: '200px' },
      { property: 'cep', label: 'Cep', width: '200px' },
      { property: 'logradouro', label: 'Logradouro', width: '200px' },
      { property: 'complemento', label: 'Complemento', width: '200px' },
      { property: 'bairro', label: 'Bairro', width: '200px' },
      { property: 'localidade', label: 'Localidade', width: '200px' },
      { property: 'uf', label: 'UF', width: '200px' },
      { property: 'numero', label: 'Número', width: '200px' },
      { property: 'criado', label: 'Criado ', width: '100px', type: 'date', format: 'dd/MM/yyyy' },
      { property: 'modificado', label: 'Modificado ', width: '100px', type: 'date', format: 'dd/MM/yyyy' },
      { property: 'criadoPor', label: 'Criado Por ', width: '200px' },
      { property: 'modificadoPor', label: 'Modificado Por ', width: '200px' },
      { property: 'ativo', label: 'Ativo', width: '100px', type: 'boolean' }
    ],
    items: [],
    height: 0,
    loading: false
  }

  pagination: Pagination = {
    totalItems: 0,
    itemsPerPage: 30,
    currentPage: 1
  }

  empresaform: FormGroup = this.fb.group({
    filtro: ['', []],
    pesquisa: ['']
  })

  selects = {
    pesquisa: <PoSelectOption[]>[
      { label: 'ID', value: 'id' },
      { label: 'NOME FANTASIA', value: 'nomeFantasia' },
      { label: 'RAZÃO SOCIAL', value: 'razaoSocial' },
      { label: 'CNPJ', value: 'cnpj' },
      { label: 'CEP', value: 'cep' },
      { label: 'LOGRADOURO', value: 'logradouro' },
      { label: 'BAIRRO', value: 'bairro' },
      { label: 'LOCALIDADE', value: 'localidade' },
      { label: 'UF', value: 'uf' },
      { label: 'ATIVO', value: 'ativo' }
    ],
    filtro: <PoSelectOption[]>[
      { label: 'SIM', value: 'true' },
      { label: 'NÃO', value: 'false' }
    ]
  }

  // constValue = {
  //   itemSelecionado: '',
  //   input: <Boolean>true,
  //   select: <Boolean>false,
  //   number: <Boolean>false,
  // }
  public itemSelecionado = '';
  public loading: boolean;

  constructor(
    private fb: FormBuilder,
    private empresaService: EmpresaService,
    private router: Router,
    private route: ActivatedRoute,
    private utilService: UtilService,
    private notificationService: PoNotificationService
  ) { }



  ngOnInit() {
    this.table.height = this.utilService.calcularHeight(innerHeight, 0.5);
    // this.controls.pesquisa.
    //   valueChanges.subscribe((data) => {
    //     this.tipoForm(data);
    //     this.controls.filtro.reset();
    //   })
    this.getEmpresa(this.empresaform.value)
  }

  get controls() {
    return this.empresaform.controls
  }

  // tipoForm(tipo) {
  //   switch (tipo) {
  //     case 'id':
  //       this.constValue.input = false;
  //       this.constValue.select = false;
  //       this.constValue.number = true;
  //       break;
  //     case 'nomeFantasia':
  //       this.constValue.input = true;
  //       this.constValue.select = false;
  //       this.constValue.number = false;
  //       break;
  //     case 'razaoSocial':
  //       this.constValue.input = true;
  //       this.constValue.select = false;
  //       this.constValue.number = false;
  //       break;
  //     case 'cnpj':
  //       this.constValue.input = false;
  //       this.constValue.select = false;
  //       this.constValue.number = true;
  //       break;
  //     case 'logradouro':
  //       this.constValue.input = true;
  //       this.constValue.select = false;
  //       this.constValue.number = false;
  //       break;
  //     case 'cep':
  //       this.constValue.input = false;
  //       this.constValue.select = false;
  //       this.constValue.number = true;
  //       break;
  //     case 'bairro':
  //       this.constValue.input = true;
  //       this.constValue.select = false;
  //       this.constValue.number = false;
  //       break;
  //     case 'localidade':
  //       this.constValue.input = true;
  //       this.constValue.select = false;
  //       this.constValue.number = false;
  //       break;
  //     case 'uf':
  //       this.constValue.input = true;
  //       this.constValue.select = false;
  //       this.constValue.number = false;
  //       break;
  //     case 'ativo':
  //       this.constValue.input = false;
  //       this.constValue.select = true;
  //       this.constValue.number = false;
  //       break;
  //     default:
  //       this.constValue.input = true;
  //       this.constValue.select = false;
  //       this.constValue.number = false;
  //       break;
  //   }
  // }

  getSelected(event) {
    this.itemSelecionado = event.id;
  }

  getUnSelected() {
    this.itemSelecionado = '';
  }


  editarEmpresa() {
    if (this.itemSelecionado == null || this.itemSelecionado == '') {
      this.notificationService.warning('Selecione uma Empresa para editar!');
      return;
    } else {
      this.router.navigate(['edit', this.itemSelecionado], { relativeTo: this.route });
    }
  }

  private viewEmpresa() {
    if (this.itemSelecionado == null || this.itemSelecionado == '') {
      this.notificationService.warning('Selecione uma Empresa para visualizar!');
      return;
    } else {
      this.router.navigate(['view', this.itemSelecionado], { relativeTo: this.route });
    }
  }

  getEmpresa(form?) {
    this.table.loading = true;
    this.empresaService.getEmpresa(this.utilService.getParameters(form))
      .subscribe((data: any) => {
        let value: Array<any> = data;
        // value = value.map((item: any) => {
        //   item.cnpj = this.utilService.formatarCnpjCpf(item.cnpj);
        //   item.telefone = this.utilService.mascaraDeTelefone2(item.telefone);
        //   item.celular = this.utilService.mascaraDeTelefone2(item.celular)
        //   return item;
        // })

        this.table.items = value
        // this.pagination.totalItems = data.totalElements;
        // this.pagination.itemsPerPage = data.size;
        this.table.loading = false;
      })

  }

  onPageChange(event: number) {
    this.pagination.currentPage = event;
    let busca: string = Object.assign({}, this.empresaform.value, { page: this.pagination.currentPage });
    this.getEmpresa(busca);
  }



}
