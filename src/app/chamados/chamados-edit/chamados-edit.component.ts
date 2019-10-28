import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoBreadcrumbItem, PoSelectOption, PoNotificationService } from '@portinari/portinari-ui';
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
        this.constValue.id = parseInt(paramMap.get('id'), 10);
      })
    if (this.router.url.toString().indexOf('externo') != -1) {
      this.constValue.tipoChamado = 'externo';
      this.chamadosFormExterno
        .valueChanges
        .subscribe((_) => {
          this.page.actions[0].disabled = this.chamadosFormExterno.invalid;
        })
      this.findById(this.constValue.id);
    } else {
      this.constValue.tipoChamado = 'interno';
      this.tipoChamadoList();
      this.chamadosFormInterno
        .valueChanges
        .subscribe((_) => {
          this.page.actions[0].disabled = this.chamadosFormInterno.invalid;
        })
      this.controls.tipoChamado
        .valueChanges.subscribe((data) => {
          this.subtipoChamado(data);
        })
      this.controls.dataFechamento
        .valueChanges.subscribe((data) => {
          this.controls.horaFechamento.setValue(this.utilService.horaAtual());
          this.controls.codigoStatusChamado.setValue(3);
        })
      this.controls.codigoStatusChamado
        .valueChanges.subscribe((data) => {
          if (data >= 1 && data <= 2) {
            this.controls.dataFechamento.reset();
            this.controls.horaFechamento.reset();
            this.controls.tempoChamado.reset();
          }
        })
      this.tipoChamado(this.constValue.tipoChamado);
      this.analistas();
      this.findById(this.constValue.id);
      this.controls.subtipoChamado.setValue(this.controls.subtipoChamado.value);
    }
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

  private tipoChamado(tipoChamado) {
    console.log(tipoChamado);
    let item: PoBreadcrumbItem[] = [];
    if (tipoChamado == 'externo') {
      this.page.title = 'Editar Chamado Externo';
      item = [
        { label: 'Externo' },
        { label: 'Editar' }
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
          if (this.constValue.tipoChamado == 'interno') {
            if (data == 'idEmpresa') {
              obj[data] = item[data].nomeFantasia;
              this.formAuxiliar.empresa = item[data];
            } else if (data == 'idAnalista') {
              obj[data] = item[data].id;
            } else if (data == 'tipoChamado') {
              obj[data] = item[data].id;
            } else if (data == 'subtipoChamado') {
              obj[data] = item[data].id.toString();
            } else if (data == 'idUsuario') {
              obj[data] = item[data].fullName;
              this.formAuxiliar.user = item[data];
            } else if (data == 'dataAbertura' && item[data].toString() != '-') {
              if (item[data] != null || item[data].length >= 10) {
                obj[data] = this.utilService.formataData(item[data].toString());
              } else {
                obj[data] = item[data];
              }
            } else if (data == 'tempoChamado' || data == 'horaAbertura' || data == 'horaFechamento') {
              //se true, ele formata para tempo, se falta joga o valor que veio do banco
              if (item[data] != null || item[data].length >= 4) {
                let hhMM: string = item[data];
                obj[data] = `${hhMM.substr(0, 2)}:${hhMM.substr(2, 2)}`;
              } else {
                obj[data] = item[data];
              }
            } else if (data == 'codigoStatusChamado') {
              obj[data] = item[data];
            } else {
              obj[data] = item[data];
            }
          } else { // externo
            if (data == 'idEmpresa') {
              obj[data] = item[data].nomeFantasia;
              this.formAuxiliar.empresa = item[data];
            } else if (data == 'idAnalista') {
              obj[data] = item[data].nome;
              this.formAuxiliar.analista = item[data];
            } else if (data == 'tipoChamado') {
              obj[data] = item[data].descricao;
              this.formAuxiliar.tipoChamado = item[data];
            } else if (data == 'subtipoChamado') {
              obj[data] = item[data].descricao;
              this.formAuxiliar.subtipoChamado = item[data];
            } else if (data == 'idUsuario') {
              obj[data] = item[data].fullName;
              this.formAuxiliar.user = item[data];
            } else if (data == 'dataAbertura' || data == 'dataFechamento' && item[data].toString().indexOf('-') == 4) {
              obj[data] = this.utilService.formataData(item[data].toString());
            } else if (data == 'tempoChamado' || data == 'horaAbertura' || data == 'horaFechamento') {
              //se true, ele formata para tempo, se falta joga o valor que veio do banco
              if (item[data] != null || item[data].length >= 4) {
                let hhMM: string = item[data];
                obj[data] = `${hhMM.substr(0, 2)}:${hhMM.substr(2, 2)}`;
              } else {
                obj[data] = item[data];
              }
            } else if (data == 'codigoStatusChamado') {
              switch (item[data]) {
                case 1:
                  obj[data] = 'Aberto';
                  this.formAuxiliar.codigoStatusChamado = item[data];
                  break;
                case 2:
                  obj[data] = 'Em Análise';
                  this.formAuxiliar.codigoStatusChamado = item[data];
                  break;
                case 3:
                  obj[data] = 'Fechado';
                  this.formAuxiliar.codigoStatusChamado = item[data];
                  break;
                case 4:
                  obj[data] = 'Indeferido';
                  this.formAuxiliar.codigoStatusChamado = item[data];
                  break;
                  obj[data] = item[data];
                default:
                  break;
              }
            } else {
              obj[data] = item[data];
            }
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

    this.controls.horaFechamento.value == '' || this.controls.horaFechamento.value == ''
      ? horaFechamento = '' : horaFechamento = this.controls.horaFechamento.value.replace(/[^0-9]/g, '');
    this.controls.tempoChamado.value == '' || this.controls.tempoChamado.value == ''
      ? tempoChamado = '' : tempoChamado = this.controls.tempoChamado.value.replace(/[^0-9]/g, '');

    if (this.controls.dataFechamento.value == null) {
      dataFechamento = '';
    } else if (this.controls.dataFechamento.value.toString().indexOf('/') == 2) {
      dataFechamento = this.utilService.multiFormataData(this.controls.dataFechamento.value, 'yyyy-mm-dd');
    } else if (this.controls.dataFechamento.value.toString().indexOf('-') == 4) {
      dataFechamento = this.controls.dataFechamento.value;
    } else {
      dataFechamento = '';
    }

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
      if (this.controls.dataFechamento)
        chamado = {
          idChamado: this.controls.idChamado.value,
          idEmpresa: this.formAuxiliar.empresa,
          idAnalista: { id: parseInt(this.controls.idAnalista.value, 10) },
          idUsuario: this.formAuxiliar.user,
          dataAbertura: this.utilService.multiFormataData(this.controls.dataAbertura.value, 'yyyy-mm-dd'),
          horaAbertura: this.controls.horaAbertura.value.replace(/[^0-9]/g, ''),
          dataFechamento: dataFechamento,
          horaFechamento: horaFechamento,
          tempoChamado: tempoChamado,
          codigoStatusChamado: parseInt(this.controls.codigoStatusChamado.value, 10),
          tipoChamado: { id: this.controls.tipoChamado.value },
          subtipoChamado: { id: this.controls.tipoChamado.value },
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