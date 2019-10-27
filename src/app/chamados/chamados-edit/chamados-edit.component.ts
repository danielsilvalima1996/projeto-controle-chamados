import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoBreadcrumbItem, PoSelectOption, PoNotificationService } from '@portinari/portinari-ui';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChamadosService } from 'src/app/services/chamados/chamados/chamados.service';
import { UtilService } from 'src/app/services/utils/util-service/util.service';
import { AnalistaService } from 'src/app/services/cadastros/analista/analista.service';
import { EmpresaService } from 'src/app/services/cadastros/empresa/empresa.service';
import { UserService } from 'src/app/services/cadastros/users/user.service';
import { LoginService } from 'src/app/services/authentication/login/login.service';
import { User } from 'src/app/interfaces/user.model';
import { Empresa } from 'src/app/interfaces/empresa.model';
import { Analista } from 'src/app/interfaces/analista.model';
import { TipoChamado } from 'src/app/interfaces/tipo-chamado.model';
import { SubtipoChamado } from 'src/app/interfaces/subtipo-chamado.model';
import { SubtipoChamadoService } from 'src/app/services/chamados/subtipo-chamado/subtipo-chamado.service';
import { TipoChamadoService } from 'src/app/services/chamados/tipo-chamado/tipo-chamado.service';

@Component({
  selector: 'app-chamados-edit',
  templateUrl: './chamados-edit.component.html',
  styleUrls: ['./chamados-edit.component.css']
})
export class ChamadosEditComponent implements OnInit {

  page: PoPageDefault = {
    title: '',
    actions: [
      {
        label: 'Salvar', action: () => this.alterarChamado()
      },
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

  selects = {
    tipoChamado: <PoSelectOption[]>[],
    subtipoChamado: <PoSelectOption[]>[],
    analistas: <PoSelectOption[]>[],
    status: <PoSelectOption[]>[
      { label: 'Aberto', value: 1 },
      { label: 'Em Análise', value: 2 },
      { label: 'Fechado', value: 3 },
      { label: 'Indeferido', value: 4 }
    ]
  }

  constValue = {
    tipoChamado: '',
    action: '',
    id: <number>0
  }

  formAuxiliar = {
    empresa: <Empresa>null,
    analista: <Analista>null,
    user: <User>null,
    tipoChamado: <TipoChamado>null,
    subtipoChamado: <SubtipoChamado>null,
    codigoStatusChamado: <number>null
  }

  chamadosFormInterno: FormGroup = this.fb.group({
    idChamado: ['', []],
    idEmpresa: ['', []],
    idAnalista: ['', [Validators.required]],
    idUsuario: ['', []],
    dataAbertura: ['', []],
    horaAbertura: ['', []],
    dataFechamento: ['', []],
    horaFechamento: ['', []],
    tempoChamado: ['', []],
    codigoStatusChamado: ['', [Validators.required]],
    tipoChamado: ['', [Validators.required]],
    subtipoChamado: ['', [Validators.required]],
    descricaoChamado: ['', [Validators.required]],
    solucaoChamado: ['', []]
  })

  chamadosFormExterno: FormGroup = this.fb.group({
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
    descricaoChamado: ['', [Validators.required]],
    solucaoChamado: ['', []]
  })

  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private chamadosService: ChamadosService,
    private utilService: UtilService,
    private analistaService: AnalistaService,
    private notificationService: PoNotificationService,
    private subtipoChamadoService: SubtipoChamadoService,
    private tipoChamadoService: TipoChamadoService
  ) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe((paramMap: ParamMap) => {
        this.constValue.action = paramMap.get('acao');
        this.constValue.id = parseInt(paramMap.get('id'), 10);
      })
    if (this.router.url.toString().indexOf('externo') != -1) {
      this.constValue.tipoChamado = 'externo';
    } else {
      this.constValue.tipoChamado = 'interno';
      this.tipoChamadoList();
      if (this.constValue.action == 'edit') {
        this.controls.tipoChamado
          .valueChanges.subscribe((data) => {
            this.subtipoChamado(data);
          })
      }
    }
    this.chamadosFormInterno
      .valueChanges
      .subscribe((_) => {
        this.page.actions[0].disabled = this.chamadosFormInterno.invalid;
      })
    this.chamadosFormExterno
      .valueChanges
      .subscribe((_) => {
        this.page.actions[0].disabled = this.chamadosFormExterno.invalid;
      })
    this.disabledButton(this.constValue.action);
    this.findById(this.constValue.id);
    this.tipoChamado(this.constValue.tipoChamado, this.constValue.action);
    this.analistas();
  }

  get controls() {
    if (this.constValue.tipoChamado == 'externo') {
      return this.chamadosFormExterno.controls;
    } else {
      return this.chamadosFormInterno.controls;
    }
  }

  private tipoChamadoList() {
    this.tipoChamadoService
      .findAll()
      .subscribe((data) => {
        let arr = data.map((item) => {
          return <PoSelectOption>{ label: item.descricao, value: item.id };
        })
        this.selects.tipoChamado = arr;
      })
  }

  private subtipoChamado(id: number) {
    this.subtipoChamadoService
      .findAllByTipo(id)
      .subscribe((data) => {
        let arr = data.map((item) => {
          return <PoSelectOption>{ label: item.descricao, value: item.id }
        })
        this.selects.subtipoChamado = arr;
      })
  }

  private analistas() {
    this.analistaService
      .findAllAtivo()
      .subscribe((data) => {
        let arr = data.map((item) => {
          return <PoSelectOption>{ label: item.nome, value: item.id }
        })
        this.selects.analistas = arr;
      })
  }

  private disabledButton(action: String) {
    if (action == 'view') {
      this.page.actions[0].disabled = true;
    }
  }

  private tipoChamado(tipoChamado, action) {
    console.log(tipoChamado + " | " + action);
    let item: PoBreadcrumbItem[] = [];
    if (tipoChamado == 'externo' && action == 'edit') {
      this.page.title = 'Editar Chamado Externo';
      item = [
        { label: 'Externo' },
        { label: 'Editar' }
      ]
    } else if (tipoChamado == 'externo' && action == 'view') {
      this.page.title = 'Visualizar Chamado Externo';
      item = [
        { label: 'Externo' },
        { label: 'Visualizar' }
      ]
    } else if (tipoChamado == 'interno' && action == 'view') {
      this.page.title = 'Visualizar Chamado Interno';
      item = [
        { label: 'Interno' },
        { label: 'Visualizar' }
      ]
    } else {
      this.page.title = 'Editar Chamado Interno';
      item = [
        { label: 'Interno' },
        { label: 'Editar' }
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
            this.formAuxiliar.empresa = item[data];
            obj[data] = item[data].nomeFantasia;
          } else if (data == 'idAnalista') {
            if (this.constValue.tipoChamado == 'interno' && this.constValue.action == 'edit') {
              obj[data] = item[data].id;
            } else {
              this.formAuxiliar.analista = item[data];
              obj[data] = item[data].nome;
            }
          } else if (data == 'tipoChamado') {
            if (this.constValue.tipoChamado == 'interno' && this.constValue.action == 'edit') {
              obj[data] = item[data].id;
            } else {
              this.formAuxiliar.tipoChamado = item[data];
              obj[data] = item[data].descricao;
            }
          } else if (data == 'subtipoChamado') {
            if (this.constValue.tipoChamado == 'interno' && this.constValue.action == 'edit') {
              obj[data] = item[data].id;
            } else {
              this.formAuxiliar.subtipoChamado = item[data];
              obj[data] = item[data].descricao;
            }
          } else if (data == 'idUsuario') {
            this.formAuxiliar.user = item[data];
            obj[data] = item[data].fullName;
          } else if (data == 'dataAbertura' && item[data].toString() != '-') {
            if (this.constValue.tipoChamado == 'externo') {
              obj[data] = this.utilService.formataData(item[data].toString());
            } else {
              obj[data] = item[data];
            }
          } else if (data == 'tempoChamado' || data == 'horaAbertura' || data == 'horaFechamento') {
            if (item[data] != null || item[data].length >= 4) {
              let hhMM: string = item[data];
              obj[data] = `${hhMM.substr(0, 2)}:${hhMM.substr(2, 2)}`;
            }
          } else if (data == 'codigoStatusChamado') {
            if (this.constValue.tipoChamado == 'interno' && this.constValue.action == 'edit') {
              obj[data] = item[data];
            } else {
              this.formAuxiliar.codigoStatusChamado = item[data];
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
            }
          } else {
            obj[data] = item[data];
          }
        })
        this.chamadosFormExterno.setValue(obj);
        this.chamadosFormInterno.setValue(obj);
      })
  }

  alterarChamado() {
    let chamado;
    this.formAuxiliar.user.authorities = [];

    let dataFechamento;
    let horaFechamento;
    let tempoChamado;

    this.controls.dataFechamento.value == '' || this.controls.dataFechamento.value == ''
      ? dataFechamento = '' : dataFechamento = this.utilService.multiFormataData(this.controls.dataFechamento.value, 'yyyy-mm-dd');
    this.controls.horaFechamento.value == '' || this.controls.horaFechamento.value == ''
      ? horaFechamento = '' : horaFechamento = this.controls.horaFechamento.value.replace(/[^0-9]/g, '');
    this.controls.tempoChamado.value == '' || this.controls.tempoChamado.value == ''
      ? tempoChamado = '' : tempoChamado = this.controls.tempoChamado.value.replace(/[^0-9]/g, '');

    if (this.constValue.tipoChamado == 'externo') {
      chamado = {
        idChamado: this.controls.idChamado.value,
        idEmpresa: this.formAuxiliar.empresa,
        idAnalista: this.formAuxiliar.analista,
        idUsuario: this.formAuxiliar.user,
        dataAbertura: this.utilService.multiFormataData(this.controls.dataAbertura.value, 'yyyy-mm-dd'),
        horaAbertura: this.controls.horaAbertura.value.replace(/[^0-9]/g, ''),
        dataFechamento: dataFechamento,
        horaFechamento: horaFechamento,
        tempoChamado: tempoChamado,
        codigoStatusChamado: this.formAuxiliar.codigoStatusChamado,
        tipoChamado: this.formAuxiliar.tipoChamado,
        subtipoChamado: this.formAuxiliar.subtipoChamado,
        descricaoChamado: this.controls.descricaoChamado.value,
        solucaoChamado: this.controls.solucaoChamado.value
      }
    } else {
      let horaAbertura;
      let horaFechamento;
      let tempoChamado;
      this.controls.horaAbertura.value == null ? horaAbertura = '' : horaAbertura = this.controls.horaAbertura.value.replace(/[^0-9]/g, '');
      this.controls.horaFechamento.value == null ? horaFechamento = '' : horaFechamento = this.controls.horaFechamento.value.replace(/[^0-9]/g, '');
      this.controls.tempoChamado.value == null ? tempoChamado = '' : tempoChamado = this.controls.tempoChamado.value.replace(/[^0-9]/g, '');
      chamado = {
        idChamado: '',
        idEmpresa: this.formAuxiliar.empresa,
        idAnalista: { id: parseInt(this.controls.idAnalista.value, 10) },
        idUsuario: this.formAuxiliar.user,
        dataAbertura: this.utilService.multiFormataData(this.controls.dataAbertura.value, 'yyyy-mm-dd'),
        horaAbertura: this.controls.horaAbertura.value.replace(/[^0-9]/g, ''),
        dataFechamento: dataFechamento,
        horaFechamento: horaFechamento,
        tempoChamado: tempoChamado,
        codigoStatusChamado: parseInt(this.controls.codigoStatusChamado.value, 10),
        tipoChamado: this.formAuxiliar.tipoChamado,
        subtipoChamado: this.formAuxiliar.subtipoChamado,
        descricaoChamado: this.controls.descricaoChamado.value,
        solucaoChamado: this.controls.solucaoChamado.value
      }
    }

    this.chamadosService
      .alterChamado(chamado)
      .subscribe((data) => {
        this.notificationService.success('Chamado editado com sucesso!');
        this.location.back();
      },
        (error: any) => {
          this.notificationService.error(error.error.error);
          return;
        })
  }
}