import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/utils/util-service/util.service';
import { PoPageDefault, PoTableColumn, PoSelectOption, PoNotificationService } from '@po-ui/ng-components';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EmpresaService } from 'src/app/services/cadastros/empresa/empresa.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Pagination } from 'src/app/interfaces/pagination.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-empresa-list',
  templateUrl: './empresa-list.component.html',
  styleUrls: ['./empresa-list.component.css']
})
export class EmpresaListComponent implements OnInit {

  page: PoPageDefault = {
    title: 'Empresa',
    actions: [
      { label: 'Novo', icon: 'po-icon po-icon-company', url: 'empresa/add' },
      { label: 'Editar', action: () => { this.goToEmpresa('edit') } },
      { label: 'Visualizar', action: () => { this.goToEmpresa('view') } }
    ],
    breadcrumb: {
      items: [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Empresa' }
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

  empresaform: FormGroup = this.fb.group({
    id: ['', []],
    cnpj: ['', []],
    razaoSocial: ['', []],
    nomeFantasia: ['', []],
    ativo: ['', []],
    cep: ['', []],
    logradouro: ['', []],
    bairro: ['', []],
    localidade: ['', []],
    uf: ['', []]
  });

  selects = {
    ativoOptions: <Array<PoSelectOption>>[
      { label: 'Ativo', value: true },
      { label: 'Inativo', value: false },
      { label: 'Todos', value: '' }
    ],
    estados: <Array<PoSelectOption>>[
      { label: "ACRE", value: "AC" },
      { label: "ALAGOAS", value: "AL" },
      { label: "AMAZONAS", value: "AM" },
      { label: "AMAPA", value: "AP" },
      { label: "BAHIA", value: "BA" },
      { label: "CEARA", value: "CE" },
      { label: "DISTRITO FEDERAL", value: "DF" },
      { label: "ESPIRITO SANTO", value: "ES" },
      { label: "GOIAS", value: "GO" },
      { label: "MARANHAO", value: "MA" },
      { label: "MINAS GERAIS", value: "MG" },
      { label: "MATO GROSSO DO SUL", value: "MS" },
      { label: "MATO GROSSO", value: "MT" },
      { label: "PARA", value: "PA" },
      { label: "PARAIBA", value: "PB" },
      { label: "PERNAMBUCO", value: "PE" },
      { label: "PIAUI", value: "PI" },
      { label: "PARANA", value: "PR" },
      { label: "RIO DE JANEIRO", value: "RJ" },
      { label: "RIO GRANDE DO NORTE", value: "RN" },
      { label: "RONDONIA", value: "RO" },
      { label: "RORAIMA", value: "RR" },
      { label: "RIO GRANDE DO SUL", value: "RS" },
      { label: "SANTA CATARINA", value: "SC" },
      { label: "SERGIPE", value: "SE" },
      { label: "SAO PAULO", value: "SP" },
      { label: "TOCANTINS", value: "TO" }
    ]
  };

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
    this.table.height = this.utilService.calcularHeight(innerHeight, 0.6);
    this.buscar(this.empresaform.value)
  }

  get controls() {
    return this.empresaform.controls
  }

  getSelected(event) {
    this.itemSelecionado = event.id;
  }

  getUnSelected() {
    this.itemSelecionado = '';
  }


  goToEmpresa(tipoTela: string) {
    switch (tipoTela) {
      case 'edit':
        if (this.itemSelecionado == null || this.itemSelecionado == '') {
          this.notificationService.warning('Selecione uma Empresa para editar!');
          return;
        } else {
          this.router.navigate(['edit', this.itemSelecionado], { relativeTo: this.route });
        }
        break;
      case 'view':
        if (this.itemSelecionado == null || this.itemSelecionado == '') {
          this.notificationService.warning('Selecione uma Empresa para visualizar!');
          return;
        } else {
          this.router.navigate(['view', this.itemSelecionado], { relativeTo: this.route });
        }
        break;
      default:
        break;
    }
  }


  public buscar(form?) {
    this.loading = true;
    this.empresaService
      .getEmpresa(this.utilService.getParameters(form))
      .subscribe((data) => {
        this.table.items = data
          .map((item) => {
          return {
            ativo: item.ativo,
            bairro: item.bairro,
            cep: this.utilService.formatarCEP(item.cep),
            cnpj: this.utilService.formatarCnpjCpf(item.cnpj),
            complemento: item.complemento,
            criado: item.criado,
            criadoPor: item.criadoPor,
            id: item.id,
            localidade: item.localidade,
            logradouro: item.logradouro,
            modificado: item.modificado,
            modificadoPor: item.modificadoPor,
            nomeFantasia: item.nomeFantasia,
            numero: item.numero,
            razaoSocial: item.razaoSocial,
            uf: item.uf
          }
        });
        this.loading = false;
      },
        (error: HttpErrorResponse) => {
          console.log(error.message);
          this.loading = false;
          this.table.items = [];
        });
  };
}
