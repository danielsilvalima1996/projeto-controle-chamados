import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoTableColumn, PoSelectOption, PoNotificationService } from '@portinari/portinari-ui';
import { SubtipoChamadoService } from 'src/app/services/chamados/subtipo-chamado/subtipo-chamado.service';
import { UtilService } from 'src/app/services/utils/util-service/util.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorSpringBoot } from 'src/app/interfaces/ErrorSpringBoot.model';

@Component({
  selector: 'app-subtipo-chamado-list',
  templateUrl: './subtipo-chamado-list.component.html',
  styleUrls: ['./subtipo-chamado-list.component.css']
})
export class SubtipoChamadoListComponent implements OnInit {

  page: PoPageDefault = {
    title: 'SubTipo Chamado',
    breadcrumb: {
      items: [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'SubTipo Chamado' },
      ]
    },
    actions: [
      { label: 'Novo', url: 'subtipo-chamado/add' },
      {
        label: 'Editar', action: () => {
          this.router.navigate(['edit', this.constValue.selecionado], { relativeTo: this.route });
        }
      }
    ],
  }

  table = {
    columns: <PoTableColumn[]>[
      { property: 'id', label: 'ID', width: '10%' },
      { property: 'descricao', label: 'Descrição', width: '20%' },
      { property: 'active', label: 'Ativo', width: '10%', type: 'boolean' },
      { property: 'idTipoChamado', label: 'Id Tipo Chamado', width: '10%' },
      { property: 'created', label: 'Criado', width: '20%', type: 'date', format: 'dd/MM/yyyy' },
      { property: 'modified', label: 'Modificado', width: '20%', type: 'date', format: 'dd/MM/yyyy' }
    ],
    items: [],
    height: 0,
    loading: false
  }

  selects = {
    pesquisa: <PoSelectOption[]>[
      { label: 'ID', value: 'id' },
      { label: 'DESCRIÇÃO', value: 'descricao' },
      { label: 'ATIVO', value: 'active' },
      { label: 'ID TIPO CHAMADO', value: 'idTipoChamado' }
    ],
    filtro: <PoSelectOption[]>[
      { label: 'SIM', value: 'true' },
      { label: 'NÃO', value: 'false' }
    ]
  }

  pagination = {
    totalItems: 0,
    itemsPerPage: 30,
    currentPage: 1
  }

  constValue = {
    selecionado: '',
    input: <Boolean>true,
    select: <Boolean>false
  }

  subtipoForm: FormGroup = this.fb.group({
    filtro: ['', []],
    pesquisa: ['', []]
  })

  constructor(
    private subtipoChamadoService: SubtipoChamadoService,
    private utilService: UtilService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: PoNotificationService
  ) { }

  ngOnInit() {
    this.table.height = this.utilService.calcularHeight(innerHeight, 0.5);
    this.controls.pesquisa
      .valueChanges.subscribe((data) => {
        this.tipoForm(data);
      })
    this.findSubtipoChamado(this.subtipoForm.value);
  }

  get controls() {
    return this.subtipoForm.controls;
  }

  findSubtipoChamado(parameters?: any) {
    this.table.loading = true;
    this.subtipoChamadoService
      .findSubtipoChamado(this.utilService.getParameters(parameters))
      .subscribe((data) => {
        let arr: Array<any> = data.content.map((item) => {
          let obj = {};
          Object.keys(item).map((data) => {
            if (item[data] == '' || item[data] == null) {
              obj[data] = '-';
            } else if (data == 'idTipoChamado') {
              obj[data] = item[data].descricao;
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
    this.constValue.selecionado = event.id;

  }

  getUnSelected() {
    this.constValue.selecionado = ''

  }

}
