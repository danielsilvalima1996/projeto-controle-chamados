import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoTableColumn, PoSelectOption, PoNotificationService } from '@portinari/portinari-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilService } from 'src/app/services/utils/util-service/util.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ChamadosService } from 'src/app/services/chamados/chamados/chamados.service';
import { ErrorSpringBoot } from 'src/app/interfaces/ErrorSpringBoot.model';

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
    pesquisa: <PoSelectOption[]>[
      { label: 'ID', value: 'id' },
      { label: 'ANALISTA', value: 'analista' },
      { label: 'STATUS', value: 'status' },
      { label: 'ASSUNTO', value: 'assunto' },
      { label: 'DESCRIÇÃO', value: 'descricao' }
    ]
  }

  constValue = {
    selecionado: '',
    tipoChamado: '',
    input: <boolean>true,
    number: <boolean>false
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
    private notificationService: PoNotificationService
  ) { }

  ngOnInit() {
    this.table.height = this.utilService.calcularHeight(innerHeight, 0.50);
    this.findChamados(this.chamadosForm.value);
    this.tipoChamados();
  }

  get controls() {
    return this.chamadosForm.controls;
  }

  private tipoChamados() {
    if (this.router.url.toString().indexOf('externo') != -1) {
      this.constValue.tipoChamado = 'externo';
    } else {
      this.constValue.tipoChamado = 'interno';
    }
  }

  selectedTable(event) {
    this.constValue.selecionado = event.idChamado;
  }

  unSelectedTable(event) {
    this.constValue.selecionado = '';
  }


  findChamados(parameters?: any) {
    this.table.loading = true;
    this.chamadosService
      .findChamados(this.utilService.getParameters(parameters))
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
            } else if ((data == 'dataAbertura' || data == 'dataFechamento') && item[data].toString() != '-' ) {
              obj[data] = this.utilService.formataData(item[data].toString());
            } else {
              obj[data] = item[data];
            }

          })
          return obj;
        })

        this.table.loading = false;
        this.table.items = arr;
      },
        (error: ErrorSpringBoot) => {
          this.notificationService.error(error.message);
        })
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

}
