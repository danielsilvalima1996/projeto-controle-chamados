import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoNotificationService, PoBreadcrumbItem } from '@portinari/portinari-ui';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChamadosService } from 'src/app/services/chamados/chamados/chamados.service';
import { UtilService } from 'src/app/services/utils/util-service/util.service';

@Component({
  selector: 'app-chamados-view',
  templateUrl: './chamados-view.component.html',
  styleUrls: ['./chamados-view.component.css']
})
export class ChamadosViewComponent implements OnInit {

  page: PoPageDefault = {
    title: '',
    actions: [
      {
        label: 'Voltar', icon: 'po-icon po-icon-arrow-left', action: () => {
          this.location.back();
        }
      }
    ],
    breadcrumb: {
      items: [
        { label: 'Chamados' }
      ]
    }
  }

  constValue = {
    tipoChamado: '',
    id: <number>0
  }

  chamadosFormView: FormGroup = this.fb.group({
    idChamado: ['', []],
    idEmpresa: ['', []],
    idAnalista: ['', []],
    idUsuario: ['', []],
    dataAbertura: ['', []],
    horaAbertura: ['', []],
    dataFechamento: ['', []],
    horaFechamento: ['', []],
    tempoChamado: ['', []],
    codigoStatusChamado: ['', []],
    tipoChamado: ['', []],
    subtipoChamado: ['', []],
    descricaoChamado: ['', []],
    solucaoChamado: ['', []]
  })

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private chamadosService: ChamadosService,
    private utilService: UtilService,
    private notificationService: PoNotificationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe((paramMap: ParamMap) => {
        this.constValue.id = parseInt(paramMap.get('id'), 10);
      })
    this.findById(this.constValue.id);
    this.tipoChamado()
  }

  get controls() {
    return this.chamadosFormView.controls
  }

  private tipoChamado() {
    let item: PoBreadcrumbItem[] = [];
    if (this.router.url.toString().indexOf('externo') != -1) {
      this.page.title = 'Visualizar Chamado Externo';
      item = [
        { label: 'Externo' },
        { label: 'Visualizar' }
      ]
    } else {
      this.page.title = 'Visualizar Chamado Interno';
      item = [
        { label: 'Interno' },
        { label: 'Visualizar' }
      ]
    }
    item.map((item) => {
      this.page.breadcrumb.items.push(item);
    })
  }

  private findById(id: number) {
    this.chamadosService
      .findById(id)
      .subscribe((item) => {
        let obj = {};
        Object.keys(item).map((data) => {
          if (item[data] == '') {
            obj[data] = '-';
          } else if (data == 'idEmpresa') {
            obj[data] = item[data].nomeFantasia;
          } else if (data == 'idAnalista') {
            obj[data] = item[data].nome;
          } else if (data == 'tipoChamado') {
            obj[data] = item[data].descricao;
          } else if (data == 'subtipoChamado') {
            obj[data] = item[data].descricao;
          } else if (data == 'idUsuario') {
            obj[data] = item[data].fullName;
          } else if ((data == 'dataAbertura' || data == 'dataFechamento') &&
            item[data].toString() != '-') {
            if (item[data].length == 10) {
              obj[data] = this.utilService.multiFormataData(item[data].toString(), 'dd/mm/yyyy');
            } else {
              obj[data] = item[data];
            }
          } else if (data == 'tempoChamado' || data == 'horaAbertura' || data == 'horaFechamento') {
            if (item[data] != null || item[data].length >= 4) {
              let hhMM: string = item[data];
              obj[data] = `${hhMM.substr(0, 2)}:${hhMM.substr(2, 2)}`;
            }
          } else if (data == 'codigoStatusChamado') {
            switch (item[data]) {
              case 1:
                obj[data] = 'Em Aberto';
                break;
              case 2:
                obj[data] = 'Em Análise';
                break;
              case 3:
                obj[data] = 'Fechado';
                break;
              case 4:
                obj[data] = 'Indeferido';
                break;
              default:
                obj[data] = 'Sem Dados';
                break;
            }
          } else {
            obj[data] = item[data];
          }
        })
        this.chamadosFormView.setValue(obj);
      })
  }
}
