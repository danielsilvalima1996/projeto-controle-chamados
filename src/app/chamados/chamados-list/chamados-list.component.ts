import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoTableColumn, PoSelectOption, PoNotificationService } from '@portinari/portinari-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilService } from 'src/app/services/utils/util-service/util.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ChamadosService } from 'src/app/services/chamados/chamados/chamados.service';

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
          this.router.navigate(['add'], { relativeTo: this.route });
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
      { label: 'idChamado', property: 'idChamado', width: '100px' },
      { label: 'idEmpresa', property: 'idEmpresa.id', width: '100px' },
      { label: 'idAnalista', property: 'idAnalista.id', width: '100px' },
      { label: 'dataAbertura', property: 'dataAbertura', width: '100px' },
      { label: 'horaAbertura', property: 'horaAbertura', width: '100px' },
      { label: 'dataFechamento', property: 'dataFechamento', width: '100px' },
      { label: 'horaFechamento', property: 'horaFechamento', width: '100px' },
      { label: 'tempoChamado', property: 'tempoChamado', width: '100px' },
      { label: 'codigoStatusChamado', property: 'codigoStatusChamado', width: '100px' },
      { label: 'tipoChamado', property: 'tipoChamado.descricao', width: '100px' },
      { label: 'subtipoChamado', property: 'subtipoChamado.descricao', width: '100px' },
      { label: 'idUsuario', property: 'idUsuario.id', width: '100px' },
      { label: 'descricaoChamado', property: 'descricaoChamado', width: '100px' },
      { label: 'solucaoChamado', property: 'solucaoChamado', width: '100px' }
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
  }

  get controls() {
    return this.chamadosForm.controls;
  }

  selectedTable(event) {
    this.constValue.selecionado = event.id;
    console.log(event.id);
  }

  unSelectedTable(event) {
    this.constValue.selecionado = '';
  }


  findChamados(parameters?: any) {
    this.table.loading = true;
    this.chamadosService
      .findChamados(this.utilService.getParameters(parameters))
      .subscribe((data) => {
        this.table.items = data.content;
        this.table.loading = false;
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
