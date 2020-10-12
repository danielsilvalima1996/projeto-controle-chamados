import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoTableColumn, PoSelectOption, PoNotificationService, PoTagType, PoBreadcrumbItem } from '@po-ui/ng-components';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChamadosService } from 'src/app/services/chamados/chamados/chamados.service';
import { UtilService } from 'src/app/services/utils/util-service/util.service';
import { TipoChamado } from 'src/app/interfaces/tipo-chamado.model';
import { SubtipoChamado } from 'src/app/interfaces/subtipo-chamado.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Tecnico } from 'src/app/interfaces/tecnico.model';
import { SubtipoChamadoService } from 'src/app/services/chamados/subtipo-chamado/subtipo-chamado.service';

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
        label: 'Salvar', action: () => this.alterarChamado(), icon: 'po-icon po-icon-ok'
      },
      {
        label: 'Voltar', icon: 'po-icon po-icon-arrow-left', action: () => {
          this.router.navigate([`/chamados/${this.tipoTela}`])
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

  selects = {
    tipoChamado: <PoSelectOption[]>[],
    subtipoChamado: <any[]>[],
    tecnico: <PoSelectOption[]>[]
  }

  public tag = {
    color: '',
    label: 'Status Chamado',
    type: <PoTagType>'',
    value: '',
  }

  public tipoChamado = {
    label: 'Inserir Comentário',
    icon: 'po-icon-plus',
    tipo: 'default'
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
    idTecnico: ['', [Validators.required]],
    idTipoChamado: ['', []],
    modificado: ['', []],
    modificadoPor: ['', []],
    statusChamado: ['', []]
  })

  table = {
    columns: <PoTableColumn[]>[
      { property: 'comentario', label: 'Descrição Comentário', width: '28%' },
      { property: 'criado', label: 'Criado ', width: '12%', type: 'date', format: 'dd/MM/yyyy' },
      { property: 'modificado', label: 'Modificado ', width: '12%', type: 'date', format: 'dd/MM/yyyy' },
      { property: 'criadoPor', label: 'Criado Por', width: '14%' },
      { property: 'modificadoPor', label: 'Modificado Por', width: '14%' },
      { property: 'idUsuario', label: 'Usuário', width: '20%' }
    ],
    items: [],
    height: 0,
    loading: false
  }

  public loading: boolean;
  public usuario: any
  public idTipoChamado: any;
  public idSubTipoChamado: any;
  public ocultarValue: boolean = false;

  public comentarioChamado: any;
  public disabledUser = false;
  public tipoTela = '';
  public disabledSubtipoChamado = false

  public criadoOriginal;
  public modificadoOriginal;
  public dataAberturaOriginal;
  public dataFechamentoOriginal;
  public statusOriginal;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private chamadosService: ChamadosService,
    private utilService: UtilService,
    private notificationService: PoNotificationService,
    private router: Router,
    private subtipoChamadoService: SubtipoChamadoService
  ) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe((paramMap: ParamMap) => {
        this.constValue.id = parseInt(paramMap.get('id'), 10);
      })
    this.findById(this.constValue.id);
    this.routeChamado();

    let arr: Array<TipoChamado> = this.route.snapshot.data['tipoChamado'];
    arr.map((item) => {
      this.selects.tipoChamado.push(<PoSelectOption>{ label: item.descricao, value: item.id })
    })

    this.selects.tipoChamado = this.utilService.sortListas(this.selects.tipoChamado);

    let array: Array<SubtipoChamado> = this.route.snapshot.data['subtipo'];
    array.map((item) => {
      this.selects.subtipoChamado.push(<PoSelectOption>{ label: item.descricao, value: item.id })
    })

    this.selects.subtipoChamado = this.utilService.sortListas(this.selects.subtipoChamado);

    let tecnicos: Array<Tecnico> = this.route.snapshot.data['tecnico'];
    tecnicos.map((item) => {
      this.selects.tecnico.push(<PoSelectOption>{ label: item.idUsuario.nomeCompleto, value: item.id })
    })

    this.selects.tecnico = this.utilService.sortListas(this.selects.tecnico);

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

  }


  get controls() {
    return this.chamadosFormEdit.controls
  }

  private routeChamado() {
    let item: PoBreadcrumbItem[] = [];
    if (this.router.url.toString().indexOf('acompanhar-usuario') != -1) {
      this.tipoTela = 'acompanhar-usuario';
      this.disabledUser = true;
      item = [
        { label: 'Usuário' },
        { label: 'Editar' }
      ]
    } else {
      this.tipoTela = 'acompanhar-tecnico';

      item = [
        { label: 'Técnico' },
        { label: 'Editar' }
      ]
    }
    item.map((item) => {
      this.page.breadcrumb.items.push(item);
    })
  }

  private retornaSubtipoChamado() {
    this.subtipoChamadoService
      .findSubtipoChamado('ativo=true')
      .subscribe((data: any) => {
        console.log(data);
        let arr = data.map((item) => {
          return <any>{ label: item.descricao, value: item.id, idTipoChamado: item.idTipoChamado.id }
        })
        this.selects.subtipoChamado = this.utilService.sortListas(arr);
      })
  }


  private findById(id: number) {
    this.loading = true;
    this.chamadosService
      .findById(id)
      .subscribe((item) => {
        console.log(item);

        this.usuario = item.idUsuario;
        this.idTipoChamado = item.idTipoChamado;
        this.idSubTipoChamado = item.idSubtipoChamado;

        this.criadoOriginal = item.criado;
        this.modificadoOriginal = item.modificado;
        this.dataAberturaOriginal = item.dataAbertura;
        this.dataFechamentoOriginal = item.dataFechamento;
        this.statusOriginal = item.statusChamado;

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

        if (item.statusChamado === 0 || item.statusChamado === 1 && this.tipoTela === 'acompanhar-tecnico') {

          this.page.actions = [
            {
              label: 'Salvar', action: () => this.alterarChamado(), icon: 'po-icon po-icon-ok'
            },
            {
              label: 'Voltar', icon: 'po-icon po-icon-arrow-left', action: () => {
                this.location.back();
              }
            },
            {
              label: 'Fechar Chamado', icon: 'po-icon po-icon-close', action: () => {
                this.finalizaChamado();
              }
            },
            {
              label: 'Indeferir Chamado', icon: 'po-icon po-icon-warning', action: () => {
                this.indefereChamado();
              }
            }
          ]
        }

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
          idSubtipoChamado: item.idSubtipoChamado.id,
          idTecnico: item.idTecnico === null ? '' : item.idTecnico.idUsuario.id,
          idTipoChamado: item.idTipoChamado.id,
          modificado: new Date(item.modificado),
          modificadoPor: item.modificadoPor,
          idComentarioChamado: item.idComentarioChamado,
          statusChamado: status
        };

        this.chamadosFormEdit.setValue(form);
        this.loading = false;
      }, (err: HttpErrorResponse) => {
        console.log(err);
        this.loading = false;

      })
  }


  alterarChamado() {
    if (this.controls.idTecnico.value === '') {
      this.notificationService.warning('Por favor selecione um técnico para executar essa ação')
    } else {
      this.loading = true;
      const chamado = {
        id: this.controls.id.value,
        idUsuario: this.usuario,
        dataAbertura: this.dataAberturaOriginal,
        dataFechamento: this.dataFechamentoOriginal,
        statusChamado: this.statusOriginal,
        idTipoChamado: { id: this.controls.idTipoChamado.value },
        idSubtipoChamado: { id: this.controls.idSubtipoChamado.value },
        idTecnico: { id: this.controls.idTecnico.value },
        descricao: this.controls.descricao.value,
        criado: this.criadoOriginal,
        modificado: this.modificadoOriginal,
        criadoPor: this.controls.criadoPor.value,
        modificadoPor: this.controls.modificadoPor.value
      }
      console.log(chamado);
      this.chamadosService
        .alterChamado(chamado)
        .subscribe((data) => {
          this.notificationService.success(`Chamado com o ${data.id} editado com sucesso`);
          this.router.navigate([`chamados/${this.tipoTela}/view`, data.id]);
          this.loading = false;
        },
          (error: any) => {
            this.notificationService.error(error.error.error);
            this.loading = false;
            return;
          })
    }
  }

  indefereChamado() {
    if (this.controls.idTecnico.value === '') {
      this.notificationService.warning('Por favor selecione um técnico para executar essa ação')
    } else {
      this.loading = true;
      const chamado = {
        id: this.controls.id.value,
        idUsuario: this.usuario,
        dataAbertura: this.dataAberturaOriginal,
        dataFechamento: this.dataFechamentoOriginal,
        statusChamado: this.statusOriginal,
        idTipoChamado: { id: this.controls.idTipoChamado.value },
        idSubtipoChamado: { id: this.controls.idSubtipoChamado.value },
        idTecnico: { id: this.controls.idTecnico.value },
        descricao: this.controls.descricao.value,
        criado: this.criadoOriginal,
        modificado: this.modificadoOriginal,
        criadoPor: this.controls.criadoPor.value,
        modificadoPor: this.controls.modificadoPor.value
      }
      console.log(chamado);

      this.chamadosService
        .indefereChamado(chamado)
        .subscribe((data) => {
          this.notificationService.success(`Chamado com o ${data.id} indeferido com sucesso`);
          this.router.navigate([`chamados/${this.tipoTela}/view`, data.id]);
          this.loading = false;
        },
          (error: any) => {
            this.notificationService.error(error.error.error);
            this.loading = false;
            return;
          })
    }
  }

  finalizaChamado() {
    if (this.controls.idTecnico.value === '') {
      this.notificationService.warning('Por favor selecione um técnico para executar essa ação')
    } else {
      this.loading = true;
      const chamado = {
        id: this.controls.id.value,
        idUsuario: this.usuario,
        dataAbertura: this.dataAberturaOriginal,
        dataFechamento: this.dataFechamentoOriginal,
        statusChamado: this.statusOriginal,
        idTipoChamado: this.idTipoChamado,
        idSubtipoChamado: this.idSubTipoChamado,
        idTecnico: { id: this.controls.idTecnico.value },
        descricao: this.controls.descricao.value,
        criado: this.criadoOriginal,
        modificado: this.modificadoOriginal,
        criadoPor: this.controls.criadoPor.value,
        modificadoPor: this.controls.modificadoPor.value
      }
      console.log(chamado);

      this.chamadosService
        .finalizarChamado(chamado)
        .subscribe((data) => {
          this.notificationService.success(`Chamado com o ${data.id} fechado com sucesso`);
          this.router.navigate([`chamados/${this.tipoTela}/view`, data.id]);
          this.loading = false;
        },
          (error: any) => {
            this.notificationService.error(error.error.error);
            this.loading = false;
            return;
          })
    }
  }

  mostraComentarioChamado() {
    this.ocultarValue = !this.ocultarValue;
    if (this.ocultarValue == true) {
      this.tipoChamado.label = 'Ocultar comentário';
      this.tipoChamado.icon = 'po-icon-close';
      this.tipoChamado.tipo = 'danger';
    } else {
      this.tipoChamado.label = 'Inserir comentário';
      this.tipoChamado.icon = 'po-icon-plus';
      this.tipoChamado.tipo = 'default'
    }
  }


  addComentario() {
    this.loading = true;
    const comentario = {
      comentario: this.comentarioChamado,
      idChamado: {
        id: this.controls.id.value
      },
      idUsuario: {
        id: this.usuario.id
      }
    }

    this.chamadosService.createComentario(comentario)
      .subscribe((data) => {
        this.comentarioChamado = '';
        this.findById(this.constValue.id);
        this.notificationService.success(`Comentário com o ${data.id} inserido com sucesso`);
        this.loading = false;
      }, (err: HttpErrorResponse) => {
        console.log(err);
        this.loading = false;
      })

  }
}
