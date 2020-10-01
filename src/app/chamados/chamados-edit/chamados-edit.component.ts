import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoTableColumn, PoSelectOption, PoNotificationService, PoTagType } from '@po-ui/ng-components';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChamadosService } from 'src/app/services/chamados/chamados/chamados.service';
import { UtilService } from 'src/app/services/utils/util-service/util.service';
import { AnalistaService } from 'src/app/services/cadastros/analista/analista.service';
import { User } from 'src/app/interfaces/user.model';
import { Empresa } from 'src/app/interfaces/empresa.model';
import { Analista } from 'src/app/interfaces/analista.model';
import { TipoChamado } from 'src/app/interfaces/tipo-chamado.model';
import { SubtipoChamado } from 'src/app/interfaces/subtipo-chamado.model';
import { SubtipoChamadoService } from 'src/app/services/chamados/subtipo-chamado/subtipo-chamado.service';
import { TipoChamadoService } from 'src/app/services/chamados/tipo-chamado/tipo-chamado.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-chamados-edit',
  templateUrl: './chamados-edit.component.html',
  styleUrls: ['./chamados-edit.component.css']
})
export class ChamadosEditComponent implements OnInit {

  page: PoPageDefault = {
    title: 'Editar Chamado',
    actions: [
      {
        label: 'Salvar', action: () => this.alterarChamado()
      }
      ,
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

  chamadosFormEdit: FormGroup = this.fb.group({
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

  public usuario: any

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
    // this.tipoChamado()
  }

  get controls() {
    return this.chamadosFormEdit.controls
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

        this.usuario = item.idUsuario

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
                this.tag.color = 'color-03';
                this.tag.type = PoTagType.Info;
                this.tag.value = 'Em Análise';
                obj[data] = 'Em Análise';
                break;
              case 3:
                this.tag.color = 'color-11';
                this.tag.type = PoTagType.Success;
                this.tag.value = 'Fechado';
                obj[data] = 'Fechado';
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
        this.chamadosFormEdit.setValue(obj);
      })
  }

  alterarChamado() {
    // let chamado;
    // this.formAuxiliar.user.authorities = [];

    // let dataFechamento;
    // let horaFechamento;
    // let tempoChamado;

    // this.controls.horaFechamento.value == '' || this.controls.horaFechamento.value == null || this.controls.horaFechamento.value == undefined
    //   ? horaFechamento = '' : horaFechamento = this.controls.horaFechamento.value.replace(/[^0-9]/g, '');
    // this.controls.tempoChamado.value == '' || this.controls.tempoChamado.value == null || this.controls.tempoChamado.value == undefined
    //   ? tempoChamado = '' : tempoChamado = this.controls.tempoChamado.value.replace(/[^0-9]/g, '');

    // if (this.controls.dataFechamento.value == null) {
    //   dataFechamento = '';
    // } else if (this.controls.dataFechamento.value.toString().indexOf('/') == 2) {
    //   dataFechamento = this.utilService.multiFormataData(this.controls.dataFechamento.value, 'yyyy-mm-dd');
    // } else if (this.controls.dataFechamento.value.toString().indexOf('-') == 4) {
    //   dataFechamento = this.controls.dataFechamento.value;
    // } else {
    //   dataFechamento = '';
    // }

    // if (this.constValue.tipoChamado == 'externo') {
    const chamado = {
      idChamado: this.controls.id.value,
      idUsuario: this.usuario
      // idEmpresa: this.formAuxiliar.empresa,
      // idAnalista: this.formAuxiliar.analista,
      // idUsuario: this.formAuxiliar.user,
      // dataAbertura: this.utilService.multiFormataData(this.controls.dataAbertura.value, 'yyyy-mm-dd'),
      // horaAbertura: this.controls.horaAbertura.value.replace(/[^0-9]/g, ''),
      // dataFechamento: dataFechamento,
      // horaFechamento: horaFechamento,
      // tempoChamado: tempoChamado,
      // codigoStatusChamado: this.formAuxiliar.codigoStatusChamado,
      // tipoChamado: this.formAuxiliar.tipoChamado,
      // subtipoChamado: this.formAuxiliar.subtipoChamado,
      // descricaoChamado: this.controls.descricaoChamado.value,
      // solucaoChamado: this.controls.solucaoChamado.value
    }
    console.log(chamado);
    
    // } 

    // else {
    //   let horaAbertura;
    //   let horaFechamento;
    //   let tempoChamado;
    //   this.controls.horaAbertura.value == null ? horaAbertura = '' : horaAbertura = this.controls.horaAbertura.value.replace(/[^0-9]/g, '');
    //   this.controls.horaFechamento.value == null ? horaFechamento = '' : horaFechamento = this.controls.horaFechamento.value.replace(/[^0-9]/g, '');
    //   this.controls.tempoChamado.value == null ? tempoChamado = '' : tempoChamado = this.controls.tempoChamado.value.replace(/[^0-9]/g, '');
    //   if (this.controls.dataFechamento)
    //     chamado = {
    //       idChamado: this.controls.idChamado.value,
    //       idEmpresa: this.formAuxiliar.empresa,
    //       idAnalista: { id: parseInt(this.controls.idAnalista.value, 10) },
    //       idUsuario: this.formAuxiliar.user,
    //       dataAbertura: this.utilService.multiFormataData(this.controls.dataAbertura.value, 'yyyy-mm-dd'),
    //       horaAbertura: this.controls.horaAbertura.value.replace(/[^0-9]/g, ''),
    //       dataFechamento: dataFechamento,
    //       horaFechamento: horaFechamento,
    //       tempoChamado: tempoChamado,
    //       codigoStatusChamado: parseInt(this.controls.codigoStatusChamado.value, 10),
    //       tipoChamado: { id: this.controls.tipoChamado.value },
    //       subtipoChamado: { id: this.controls.tipoChamado.value },
    //       descricaoChamado: this.controls.descricaoChamado.value,
    //       solucaoChamado: this.controls.solucaoChamado.value
    //     }
  }

  //   this.chamadosService
  // .alterChamado(chamado)
  // .subscribe((data) => {
  //   this.notificationService.success('Chamado editado com sucesso!');
  //   this.location.back();
  // },
  //   (error: any) => {
  //     this.notificationService.error(error.error.error);
  //     return;
  //   })
  //}
}
