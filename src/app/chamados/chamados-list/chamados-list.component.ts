import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoTableColumn, PoSelectOption, PoNotificationService } from '@po-ui/ng-components';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilService } from 'src/app/services/utils/util-service/util.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ChamadosService } from 'src/app/services/chamados/chamados/chamados.service';
import { ErrorSpringBoot } from 'src/app/interfaces/ErrorSpringBoot.model';
import { LoginService } from 'src/app/services/authentication/login/login.service';
import { SubtipoChamadoService } from 'src/app/services/chamados/subtipo-chamado/subtipo-chamado.service';
import { UserService } from 'src/app/services/cadastros/users/user.service';
import { TipoChamadoService } from 'src/app/services/chamados/tipo-chamado/tipo-chamado.service';
import { TecnicosService } from 'src/app/services/cadastros/tecnicos/tecnicos.service';
import { Usuario } from 'src/app/interfaces/usuario.model';

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
          let url = `chamados/${this.tipoChamado}/add`;
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
      {
        property: 'statusChamado', label: '-', type: 'subtitle', width: '40px', subtitles: [
          { value: 0, color: 'color-08', label: 'Em Aberto', content: '' },
          { value: 1, color: 'color-01', label: 'Em Análise', content: '' },
          { value: 2, color: 'color-11', label: 'Fechado', content: '' },
          { value: 3, color: 'color-07', label: 'Indeferido', content: '' },
        ]
      },
      { label: 'Chamado', property: 'id', width: '100px' },
      { label: 'Técnico', property: 'idTecnico', width: '200px' },
      { label: 'Data Abertura', property: 'dataAbertura', width: '150px', type: 'date', format: 'dd/MM/yyyy' },
      { label: 'Data Fechamento', property: 'dataFechamento', width: '150px', type: 'date', format: 'dd/MM/yyyy' },
      // { label: 'Status Chamado', property: 'statusChamado', width: '150px' },
      { label: 'Tipo Chamado', property: 'idTipoChamado', width: '150px' },
      { label: 'Subtipo Chamado', property: 'idSubtipoChamado', width: '150px' },
      { label: 'Usuario', property: 'idUsuario', width: '200px' },
      { label: 'Descrição', property: 'descricao', width: '300px' },
      { property: 'criado', label: 'Criado', width: '100px', type: 'date', format: 'dd/MM/yyyy' },
      { property: 'modificado', label: 'Modificado', width: '150px', type: 'date', format: 'dd/MM/yyyy' },
      { property: 'criadoPor', label: 'Criado Por', width: '200px' },
      { property: 'modificadoPor', label: 'Modificado Por', width: '200px' },
    ],
    items: [],
    loading: <boolean>false,
    height: 0
  }

  selects = {
    tecnico: <PoSelectOption[]>[],
    tipoChamado: <PoSelectOption[]>[],
    subtipoChamado: <any[]>[],
    usuarios: <PoSelectOption[]>[],
    status: <PoSelectOption[]>[
      { label: 'Aberto', value: 0 },
      { label: 'Em Análise', value: 1 },
      { label: 'Fechado', value: 2 },
      { label: 'Indeferido', value: 3 }
    ],
  }

  public selecionado
  public tipoChamado = ''
  public idUsuario = 0

  // pagination: Pagination = {
  //   itemsPerPage: 30,
  //   totalItems: 0,
  //   currentPage: 1
  // }

  chamadosForm: FormGroup = this.fb.group({
    id: ['', []],
    idUsuario: ['', []],
    statusChamado: ['', []],
    idTipoChamado: ['', []],
    idSubtipoChamado: ['', []],
    idTecnico: ['', []],
    descricao: ['', []],
  })

  public loading: boolean;
  public disabledField = false;
  public esconderCampo = false;
  public disabledSubtipoChamado = true;
  
  constructor(
    private router: Router,
    private chamadosService: ChamadosService,
    private utilService: UtilService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private notificationService: PoNotificationService,
    private loginService: LoginService,
    private subtipoChamadoService: SubtipoChamadoService,
    private tipoChamadoService: TipoChamadoService,
    private usuariosService: UserService,
    private tecnicosService: TecnicosService
  ) { }

  ngOnInit() {
    this.table.height = this.utilService.calcularHeight(innerHeight, 0.50);
    this.retornaUsuarios();
    this.retornaTecnicos();
    this.retornaTipoChamado();
    this.retornaSubtipoChamado();

    let arr: Array<Usuario> = this.route.snapshot.data['usuarios'];
    arr.map((item) => {
      this.selects.usuarios.push(<PoSelectOption>{ label: item.nomeCompleto, value: item.id })
    })

    if (this.router.url.toString().indexOf('acompanhar-usuario') != -1) {
      this.tipoChamado = 'acompanhar-usuario';
      this.loginService.getUserInformation$
        .subscribe((data) => {
          this.controls.idUsuario.setValue(data.id)
          this.idUsuario = data.id;
          this.disabledField = true;
          this.esconderCampo = true;
        })
    } else {
      this.tipoChamado = 'acompanhar-tecnico';
    }


    this.controls.idTipoChamado
    .valueChanges.subscribe((data) => {
      if (data === undefined || data === '' || data === null) {
        this.selects.subtipoChamado = [];
        this.controls.idSubtipoChamado.setValue(undefined);
        this.retornaSubtipoChamado();
        this.disabledSubtipoChamado = true;
      } else {
        const tipoChamado = this.selects.subtipoChamado.filter(item => item.idTipoChamado === data);
        this.selects.subtipoChamado = tipoChamado;
        this.disabledSubtipoChamado = false;
      }
    });

    this.searchData();
  }

  get controls() {
    return this.chamadosForm.controls;
  }

  private retornaTecnicos() {
    this.tecnicosService.getTecnico('ativo=true')
      .subscribe((data: any) => {
        let arr = data.map((item) => {
          return <PoSelectOption>{ label: item.idUsuario.nomeCompleto, value: item.id };
        })
        this.selects.tecnico = this.utilService.sortListas(arr);;
      })
  }

  private retornaSubtipoChamado() {
    this.subtipoChamadoService
      .findSubtipoChamado('ativo=true')
      .subscribe((data: any) => {
        let arr = data.map((item) => {
          return <any>{ label: item.descricao, value: item.id, idTipoChamado: item.idTipoChamado.id }
        })
        this.selects.subtipoChamado = this.utilService.sortListas(arr);
      })
  }


  private retornaTipoChamado() {
    this.tipoChamadoService.findAll('ativo=true')
      .subscribe((data: any) => {
        let arr = data.map((item) => {
          return <PoSelectOption>{ label: item.descricao, value: item.id };
        })
        this.selects.tipoChamado = this.utilService.sortListas(arr);

      })
  }

  private retornaUsuarios() {
    this.usuariosService
      .getUser("ativo=true")
      .subscribe((data: any) => {
        let arr = data.map((item) => {
          return <PoSelectOption>{ label: `${item.nomeCompleto}`, value: item.id }
        });
        this.selects.usuarios = this.utilService.sortListas(arr);
      })
  }

  selectedTable(event) {
    this.selecionado = event;
    console.log(this.selecionado);
  }

  unSelectedTable() {
    this.selecionado = '';
  }

  searchData() {
    this.findChamados(this.utilService.getParameters(this.chamadosForm.value));
  }

  findChamados(parameters?: any) {
    this.loading = true;
    this.chamadosService
      .findChamados(parameters)
      .subscribe((data: any) => {
        this.table.items = data
          .map((item) => {
            return {
              id: item.id,
              idTecnico: item.idTecnico === null ? '' : item.idTecnico.idUsuario.nomeCompleto,
              dataAbertura: item.dataAbertura,
              dataFechamento: item.dataFechamento,
              statusChamado: item.statusChamado,
              idTipoChamado: item.idTipoChamado.descricao,
              idSubtipoChamado: item.idSubtipoChamado.descricao,
              idUsuario: item.idUsuario.nomeCompleto,
              descricao: item.descricao,
              criado: item.criado,
              criadoPor: item.criadoPor,
              modificado: item.modificado,
              modificadoPor: item.modificadoPor
            }
          });
        this.loading = false;
      },
        (error: ErrorSpringBoot) => {
          this.notificationService.error(error.message);
          this.loading = false;
          this.table.items = [];
        })
  }

  private visualizarChamado() {
    if (this.selecionado == null || this.selecionado == '') {
      this.notificationService.warning('Selecione um chamado para visualizar!');
      return;
    } else {
      this.router.navigate(['view', this.selecionado.id], { relativeTo: this.route });
    }
  }

  private editarChamado() {
    if (this.selecionado == null || this.selecionado == '') {
      this.notificationService.warning('Selecione um chamado para editar!');
      return;
    } else if (this.selecionado.statusChamado === 2) {
      this.notificationService.information('O registro selecionado está fechado e não pode ser editado');
      return;
    } else if (this.selecionado.statusChamado === 3) {
      this.notificationService.information('O registro selecionado está indeferido e não pode ser editado');
      return;
    } else {
      this.router.navigate(['edit', this.selecionado.id], { relativeTo: this.route });
    }

  }

  // onPageChange(event: number) {
  //   this.pagination.currentPage = event;
  //   let busca: string = Object.assign({}, this.chamadosForm.value, { page: this.pagination.currentPage });
  //   this.findChamados(busca);
  // }

  limparFiltros() {
    this.chamadosForm.reset();
    if (this.tipoChamado === 'acompanhar-usuario') {
      this.controls.idUsuario.setValue(this.idUsuario);
    }
  }

}
