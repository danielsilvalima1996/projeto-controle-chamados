import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoTableColumn, PoSelectOption, PoNotificationService } from '@portinari/portinari-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilService } from 'src/app/services/utils/util-service/util.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ChamadosService } from 'src/app/services/chamados/chamados/chamados.service';
import { ErrorSpringBoot } from 'src/app/interfaces/ErrorSpringBoot.model';
import { Pagination } from 'src/app/interfaces/pagination.model';
import { LoginService } from 'src/app/services/authentication/login/login.service';
import { AnalistaService } from 'src/app/services/cadastros/analista/analista.service';
import { SubtipoChamadoService } from 'src/app/services/chamados/subtipo-chamado/subtipo-chamado.service';
import { EmpresaService } from 'src/app/services/cadastros/empresa/empresa.service';
import { UserService } from 'src/app/services/cadastros/users/user.service';
import { TipoChamadoService } from 'src/app/services/chamados/tipo-chamado/tipo-chamado.service';

@Component({
  selector: 'app-chamados-list',
  templateUrl: './chamados-list.component.html',
  styleUrls: ['./chamados-list.component.css']
})
export class ChamadosListComponent implements OnInit {

  page: PoPageDefault = {
    title: 'Lista de Chamados',
    actions: [
      {
        label: 'Novo', icon: 'po-icon po-icon-plus-circle', action: () => {
          let url = `chamados/${this.constValue.tipoChamado}/add`;
          this.router.navigate([url]);
        }
      },
      {
        label: 'Editar', action: () => {
          this.editarChamado();
        }
      },
      {
        label: 'Visualizar', action: () => {
          this.visualizarChamado();
        }
      }
    ],
    breadcrumb: {
      items: [
        { label: 'Home' },
        { label: 'Lista de Chamados' }
      ]
    }
  }

  table = {
    columns: <PoTableColumn[]>[
      { label: 'Id Chamado', property: 'idChamado', width: '150px' },
      { label: 'Empresa', property: 'idEmpresa', width: '150px' },
      { label: 'Analista', property: 'idAnalista', width: '150px' },
      { label: 'Data Abertura', property: 'dataAbertura', width: '150px' },
      { label: 'Hora Abertura', property: 'horaAbertura', width: '150px' },
      { label: 'Data Fechamento', property: 'dataFechamento', width: '150px' },
      { label: 'Hora Fechamento', property: 'horaFechamento', width: '150px' },
      { label: 'Tempo Chamado', property: 'tempoChamado', width: '150px' },
      { label: 'Status Chamado', property: 'codigoStatusChamado', width: '150px' },
      { label: 'Tipo Chamado', property: 'tipoChamado', width: '150px' },
      { label: 'Subtipo Chamado', property: 'subtipoChamado', width: '150px' },
      { label: 'Usuario', property: 'idUsuario', width: '150px' },
      { label: 'Descrição Chamado', property: 'descricaoChamado', width: '300px' },
      { label: 'Solução Chamado', property: 'solucaoChamado', width: '300px' }
    ],
    items: [],
    loading: <boolean>false,
    height: 0
  }

  selects = {
    pesquisa: <PoSelectOption[]>[],
    filtro: <PoSelectOption[]>[],
    analista: <PoSelectOption[]>[],
    tipoChamado: <PoSelectOption[]>[],
    subtipoChamado: <PoSelectOption[]>[],
    empresa: <PoSelectOption[]>[],
    user: <PoSelectOption[]>[],
    status: <PoSelectOption[]>[
      { label: 'Aberto', value: 1 },
      { label: 'Em Análise', value: 2 },
      { label: 'Fechado', value: 3 },
      { label: 'Indeferido', value: 4 }
    ],
  }

  constValue = {
    selecionado: '',
    tipoChamado: '',
    input: <boolean>true,
    select: <boolean>false,
    number: <boolean>false,
    idUsuario: <number>null
  }

  pagination: Pagination = {
    itemsPerPage: 30,
    totalItems: 0,
    currentPage:1
  }

  chamadosForm: FormGroup = this.fb.group({
    pesquisa: ['', []],
    filtro: ['', []],
  })

  constructor(
    private router: Router,
    private chamadosService: ChamadosService,
    private utilService: UtilService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private notificationService: PoNotificationService,
    private loginService: LoginService,
    private analistaService: AnalistaService,
    private subtipoChamadoService: SubtipoChamadoService,
    private tipoChamadoService: TipoChamadoService,
    private empresaService: EmpresaService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.table.height = this.utilService.calcularHeight(innerHeight, 0.50);
    this.analista();
    this.subtipoChamadoList();
    this.tipoChamadoList();
    this.empresaList();
    this.userList();
    this.loginService.getUserInformation$.subscribe((data) => {
      this.constValue.idUsuario = data.id;
    })
    this.tipoChamados();
    this.controls.pesquisa
      .valueChanges.subscribe((data) => {
        this.inputSelect(data);
      })
    this.findChamados();
  }

  get controls() {
    return this.chamadosForm.controls;
  }

  private analista() {
    this.analistaService
      .findAllAtivo()
      .subscribe((data) => {
        let arr = data.map((item) => {
          return <PoSelectOption>{ label: item.nome, value: item.id.toString() }
        })
        this.selects.analista = arr
      })
  }

  private subtipoChamadoList() {
    this.subtipoChamadoService
      .findAll().subscribe((data) => {
        let arr = data.map((item) => {
          return <PoSelectOption>{ label: item.descricao, value: item.id }
        })
        this.selects.subtipoChamado = arr;
      })
  }

  private tipoChamadoList() {
    this.tipoChamadoService
      .findAll().subscribe((data) => {
        let arr = data.map((item) => {
          return <PoSelectOption>{ label: item.descricao, value: item.id }
        })
        this.selects.tipoChamado = arr;
      })
  }

  private empresaList() {
    this.empresaService
      .findAllAtivo().subscribe((data) => {
        let arr = data.map((item) => {
          return <PoSelectOption>{ label: item.nomeFantasia, value: item.id }
        })
        this.selects.empresa = arr;
      })
  }

  private userList() {
    this.userService.findAllUser()
      .subscribe((data) => {
        let arr = data.map((item) => {
          return <PoSelectOption>{ label: `Usuário: ${item.fullName} - Empresa: ${item.idEmpresa.nomeFantasia}`, value: item.id }
        })
        this.selects.user = arr;
      })
  }

  private inputSelect(data) {
    switch (data) {
      case 'idChamado':
        this.constValue.input = false;
        this.constValue.select = false;
        this.constValue.number = true;
        break;
      case 'idAnalista':
        this.constValue.input = false;
        this.constValue.select = true;
        this.selects.filtro = this.selects.analista;
        this.constValue.number = false;
        break;
      case 'codigoStatusChamado':
        this.constValue.input = false;
        this.constValue.select = true;
        this.selects.filtro = this.selects.status;
        this.constValue.number = false;
        break;
      case 'descricaoChamado':
        this.constValue.input = true;
        this.constValue.select = false;
        this.constValue.number = false;
        break;
      case 'solucaoChamado':
        this.constValue.input = true;
        this.constValue.select = false;
        this.constValue.number = false;
        break;
      case 'idSubtipoChamado':
        this.constValue.input = false;
        this.constValue.select = true;
        this.selects.filtro = this.selects.subtipoChamado;
        this.constValue.number = false;
        break;
      case 'idTipoChamado':
        this.constValue.input = false;
        this.constValue.select = true;
        this.selects.filtro = this.selects.tipoChamado;
        this.constValue.number = false;
        break;
      case 'idEmpresa':
        this.constValue.input = false;
        this.constValue.select = true;
        this.selects.filtro = this.selects.empresa;
        this.constValue.number = false;
        break;
      case 'idUsuario':
        this.constValue.input = false;
        this.constValue.select = true;
        this.selects.filtro = this.selects.user;
        this.constValue.number = false;
        break;
      default:
        this.constValue.input = true;
        this.constValue.select = false;
        this.constValue.number = false;
        break;
    }
  }

  private tipoChamados() {
    if (this.router.url.toString().indexOf('externo') != -1) {
      this.constValue.tipoChamado = 'externo';
      this.selects.pesquisa = [
        { label: 'ID CHAMADO', value: 'idChamado' },
        { label: 'ID ANALISTA', value: 'idAnalista' },
        { label: 'STATUS', value: 'codigoStatusChamado' },
        { label: 'DESCRIÇÃO', value: 'descricaoChamado' },
        { label: 'SOLUÇÃO CHAMADO', value: 'solucaoChamado' },
        { label: 'ID SUBTIPO CHAMADO', value: 'idSubtipoChamado' },
        { label: 'ID TIPO CHAMADO', value: 'idTipoChamado' }
      ]
      this.selects.pesquisa.sort((a, b) => {
        return a.label < b.label ? -1 : a.label > b.label ? 1 : 0;
      })
    } else {
      this.constValue.tipoChamado = 'interno';
      this.selects.pesquisa = [
        { label: 'ID CHAMADO', value: 'idChamado' },
        { label: 'ID ANALISTA', value: 'idAnalista' },
        { label: 'STATUS', value: 'codigoStatusChamado' },
        { label: 'DESCRIÇÃO', value: 'descricaoChamado' },
        { label: 'SOLUÇÃO CHAMADO', value: 'solucaoChamado' },
        { label: 'ID EMPRESA', value: 'idEmpresa' },
        { label: 'ID USUÁRIO', value: 'idUsuario' },
        { label: 'ID SUBTIPO CHAMADO', value: 'idSubtipoChamado' },
        { label: 'ID TIPO CHAMADO', value: 'idTipoChamado' }
      ]
      this.selects.pesquisa.sort((a, b) => {
        return a.label < b.label ? -1 : a.label > b.label ? 1 : 0;
      })
    }
  }

  selectedTable(event) {
    this.constValue.selecionado = event.idChamado;
  }

  unSelectedTable(event) {
    this.constValue.selecionado = '';
  }

  searchData() {
    this.findChamados(this.utilService.getParameters(this.chamadosForm.value));
  }

  findChamados(parameters?: any) {
    this.table.loading = true;
    if (this.constValue.tipoChamado == 'externo') {
      this.chamadosService
        .findChamadosUser(this.constValue.idUsuario, parameters)
        .subscribe((data) => {
          let arr: Array<any> = data.content.map((item) => {
            let obj = {};
            Object.keys(item).map((data) => {
              if (item[data] == '' || item[data] == null) {
                obj[data] = '-';
              } else if (data == 'idEmpresa') {
                obj[data] = item[data].nomeFantasia;
                item.idEmpresa.nomeFantasia
              } else if (data == 'idAnalista') {
                obj[data] = item[data].nome;
              } else if (data == 'tipoChamado') {
                obj[data] = item[data].descricao;
              } else if (data == 'subtipoChamado') {
                obj[data] = item[data].descricao;
              } else if (data == 'idUsuario') {
                obj[data] = item[data].fullName;
              } else if ((data == 'dataAbertura' || data == 'dataFechamento') && item[data].toString() != '-') {
                obj[data] = this.utilService.formataData(item[data].toString());
              } else if (data == 'tempoChamado' || data == 'horaAbertura' || data == 'horaFechamento') {
                if (item[data] != null || item[data].length >= 4) {
                  let hhMM: string = item[data];
                  obj[data] = `${hhMM.substr(0, 2)}:${hhMM.substr(2, 2)}`;
                } else {
                  obj[data] = item[data];
                }
              } else {
                obj[data] = item[data];
              }

            })
            return obj;
          })
          this.pagination.totalItems = data.totalElements;
          this.pagination.itemsPerPage = data.size;
          this.table.loading = false;
          this.table.items = arr;
        },
          (error: ErrorSpringBoot) => {
            this.notificationService.error(error.message);
          })
    } else {
      this.chamadosService
        .findChamados(parameters)
        .subscribe((data) => {
          let arr: Array<any> = data.content.map((item) => {
            let obj = {};
            Object.keys(item).map((data) => {
              if (item[data] == '' || item[data] == null) {
                obj[data] = '-';
              } else if (data == 'idEmpresa') {
                obj[data] = item[data].nomeFantasia;
                item.idEmpresa.nomeFantasia
              } else if (data == 'idAnalista') {
                obj[data] = item[data].nome;
              } else if (data == 'tipoChamado') {
                obj[data] = item[data].descricao;
              } else if (data == 'subtipoChamado') {
                obj[data] = item[data].descricao;
              } else if (data == 'idUsuario') {
                obj[data] = item[data].fullName;
              } else if ((data == 'dataAbertura' || data == 'dataFechamento') && item[data].toString() != '-') {
                obj[data] = this.utilService.formataData(item[data].toString());
              } else if (data == 'tempoChamado' || data == 'horaAbertura' || data == 'horaFechamento') {
                if (item[data] != null || item[data].length >= 4) {
                  let hhMM: string = item[data];
                  obj[data] = `${hhMM.substr(0, 2)}:${hhMM.substr(2, 2)}`;
                } else {
                  obj[data] = item[data];
                }
              } else {
                obj[data] = item[data];
              }

            })
            return obj;
          })
          this.pagination.totalItems = data.totalElements;
          this.pagination.itemsPerPage = data.size;
          this.table.loading = false;
          this.table.items = arr;
        },
          (error: ErrorSpringBoot) => {
            this.notificationService.error(error.message);
          })
    }


  }

  private visualizarChamado() {
    if (this.constValue.selecionado == null || this.constValue.selecionado == '') {
      this.notificationService.warning('Selecione um chamado para visualizar!');
      return;
    } else {
      this.router.navigate(['view', this.constValue.selecionado], { relativeTo: this.route });
    }
  }

  private editarChamado() {
    if (this.constValue.selecionado == null || this.constValue.selecionado == '') {
      this.notificationService.warning('Selecione um chamado para editar!');
      return;
    } else {
      this.router.navigate(['edit', this.constValue.selecionado], { relativeTo: this.route });
    }

  }

  onPageChange(event: number) {
    this.pagination.currentPage = event;
    let busca: string = Object.assign({}, this.chamadosForm.value, { page: this.pagination.currentPage });
    this.findChamados(busca);
  }

}
