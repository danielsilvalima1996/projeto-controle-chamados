import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoNotificationService, PoBreadcrumbItem, PoTagType, PoTableColumn } from '@po-ui/ng-components';
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
    title: 'Visualizar Chamado',
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

  public tag = {
    color: '',
    label: 'Status',
    type: <PoTagType>'',
    value: '',
  }

  chamadosFormView: FormGroup = this.fb.group({
    criado: ['', []],
    criadoPor: ['', []],
    dataAbertura: ['', []],
    dataFechamento: ['', []],
    descricao: ['', []],
    id: ['', []],
    idComentarioChamado: ['', []],
    idSubtipoChamado: ['', []],
    idTecnico: ['', []],
    idTipoChamado: ['', []],
    modificado: ['', []],
    modificadoPor: ['', []],
    statusChamado: ['', []]
  })

  table = {
    columns: <PoTableColumn[]>[
      { property: 'id', label: 'ID', width: '5%' },
      { property: 'comentario', label: 'Descrição Comentário', width: '25%' },
      { property: 'criado', label: 'Criado ', width: '12%', type: 'date', format: 'dd/MM/yyyy' },
      { property: 'modificado', label: 'Modificado ', width: '12%', type: 'date', format: 'dd/MM/yyyy' },
      { property: 'criadoPor', label: 'Criado Por', width: '14%' },
      { property: 'modificadoPor', label: 'Modificado Por', width: '14%' },
      { property: 'idUsuario', label: 'Usuário', width: '18%' }
    ],
    items: [],
    height: 0,
    loading: false
  }

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
    this.routeChamado();
    // this.tipoChamado()
  }

  private routeChamado() {
    let item: PoBreadcrumbItem[] = [];
    if (this.router.url.toString().indexOf('acompanhar-usuario') != -1) {
      item = [
        { label: 'Usuário' },
        { label: 'Visualizar' }
      ]
    } else {
      item = [
        { label: 'Técnico' },
        { label: 'Visualizar' }
      ]
    }
    item.map((item) => {
      this.page.breadcrumb.items.push(item);
    })
  }

  get controls() {
    return this.chamadosFormView.controls
  }

  // private tipoChamado() {
  //   let item: PoBreadcrumbItem[] = [];
  //   if (this.router.url.toString().indexOf('externo') != -1) {
  //     this.page.title = 'Visualizar Chamado Externo';
  //     item = [
  //       { label: 'Externo' },
  //       { label: 'Visualizar' }
  //     ]
  //   } else {
  //     this.page.title = 'Visualizar Chamado Interno';
  //     item = [
  //       { label: 'Interno' },
  //       { label: 'Visualizar' }
  //     ]
  //   }
  //   item.map((item) => {
  //     this.page.breadcrumb.items.push(item);
  //   })
  // }

  private findById(id: number) {
    this.chamadosService
      .findById(id)
      .subscribe((item) => {

        this.table.items = item.idComentarioChamado
        .map((item) => {
          return {
            id: item.id,
            comentario: item.comentario,
            criado: item.criado,
            criadoPor: item.criadoPor,
            modificado: item.modificado,
            modificadoPor: item.modificadoPor,
            idUsuario: item.idUsuario.nomeCompleto
          }
        });

        let obj = {};
        Object.keys(item).map((data) => {
          if (item[data] == '') {
            obj[data] = '-';
          } else if (data == 'idEmpresa') {
            obj[data] = item[data].nomeFantasia;
          } else if (data == 'idTecnico') {
            obj[data] = item[data].idUsuario.nomeCompleto;
          } else if (data == 'idTipoChamado') {
            obj[data] = item[data].descricao;
          } else if (data == 'idSubtipoChamado') {
            obj[data] = item[data].descricao;
          } else if (data == 'idUsuario') {
            // obj[data] = item[data].fullName;
          } else if (data == 'dataAbertura' || data == 'dataFechamento') {
            obj[data] = new Date(item[data])
          } else if (data === 'criado') {
            obj[data] = new Date(item[data])
          } else if (data === 'modificado') {
            obj[data] = new Date(item[data])
          } else if (data == 'statusChamado') {
            switch (item[data]) {
              case 1:
                this.tag.color = 'color-08';
                this.tag.type = PoTagType.Warning;
                this.tag.value = 'Em Aberto';
                obj[data] = 'Em Aberto';
                break;
              case 2:
                this.tag.color = 'color-11';
                this.tag.type = PoTagType.Info;
                this.tag.value = 'Fechado';
                obj[data] = 'Fechado';
                break;
              case 3:
                this.tag.color = 'color-03';
                this.tag.type = PoTagType.Success;
                this.tag.value = 'Indeferido';
                obj[data] = 'Indeferido';
                break;
              case 4:
                this.tag.color = 'color-07';
                this.tag.type = PoTagType.Danger;
                this.tag.value = 'Indeferido';
                obj[data] = 'Indeferido';
                break;
              default:
                this.tag.color = 'color-01';
                this.tag.type = PoTagType.Info;
                this.tag.value = 'Sem Dados';
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
