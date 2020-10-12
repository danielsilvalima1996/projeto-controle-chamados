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
          this.router.navigate([`chamados/${this.tipoTela}`])
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
      { property: 'comentario', label: 'Descrição Comentário', width: '25%' },
      { property: 'criado', label: 'Criado ', width: '12%', type: 'date', format: 'dd/MM/yyyy' },
      { property: 'modificado', label: 'Modificado ', width: '12%', type: 'date', format: 'dd/MM/yyyy' },
      { property: 'criadoPor', label: 'Criado Por', width: '14%' },
      { property: 'modificadoPor', label: 'Modificado Por', width: '14%' },
      { property: 'idUsuario', label: 'Usuário', width: '23%' }
    ],
    items: [],
    height: 0,
    loading: false
  }

  public tipoTela = '';

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private chamadosService: ChamadosService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe((paramMap: ParamMap) => {
        this.constValue.id = parseInt(paramMap.get('id'), 10);
      })
    this.findById(this.constValue.id);
    this.routeChamado();
  }

  private routeChamado() {
    let item: PoBreadcrumbItem[] = [];
    if (this.router.url.toString().indexOf('acompanhar-usuario') != -1) {
      this.tipoTela = 'acompanhar-usuario';
      item = [
        { label: 'Usuário' },
        { label: 'Visualizar' }
      ]
    } else {
      this.tipoTela = 'acompanhar-tecnico';
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

        console.log(item.statusChamado);

        let status

        switch (item.statusChamado) {

          case 0:
            this.tag.color = 'color-08';
            // this.tag.type = PoTagType.Warning;
            this.tag.value = 'Em Aberto';
            status = 'Em Aberto';
            break;
          case 1:
            this.tag.color = 'color-01';
            // this.tag.type = PoTagType.Warning;
            this.tag.value = 'Em Análise';
            status = 'Em Análise';
            break;
          case 2:
            this.tag.color = 'color-11';
            // this.tag.type = PoTagType.Info;
            this.tag.value = 'Fechado';
            status = 'Fechado';
            break;
          case 3:
            this.tag.color = 'color-07';
            // this.tag.type = PoTagType.Success;
            this.tag.value = 'Indeferido';
            status = 'Indeferido';
            break;
          default:
            break;
        }

        const form = {
          criado: new Date(item.criado),
          criadoPor: item.criadoPor,
          dataAbertura: new Date(item.dataAbertura),
          dataFechamento: item.dataFechamento === null ? '' : new Date(item.dataFechamento),
          descricao: item.descricao,
          id: item.id,
          idSubtipoChamado: item.idSubtipoChamado.descricao,
          idTecnico: item.idTecnico === null ? '' : item.idTecnico.idUsuario.nomeCompleto,
          idTipoChamado: item.idTipoChamado.descricao,
          modificado: new Date(item.modificado),
          modificadoPor: item.modificadoPor,
          idComentarioChamado: item.idComentarioChamado,
          statusChamado: status
        };

        this.chamadosFormView.setValue(form);
      })
  }
}
