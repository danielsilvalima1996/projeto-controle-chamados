import { Component, OnInit, ErrorHandler } from '@angular/core';
import { PoPageDefault, PoBreadcrumbItem, PoSelectOption, PoNotification, PoNotificationService } from '@portinari/portinari-ui';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UtilService } from 'src/app/services/utils/util-service/util.service';
import { TipoChamadoService } from 'src/app/services/chamados/tipo-chamado/tipo-chamado.service';
import { SubtipoChamadoService } from 'src/app/services/chamados/subtipo-chamado/subtipo-chamado.service';
import { ChamadosService } from 'src/app/services/chamados/chamados/chamados.service';
import { identifierModuleUrl } from '@angular/compiler';
import { User } from 'src/app/interfaces/user.model';
import { Login } from 'src/app/interfaces/login.model';
import { LoginService } from 'src/app/services/authentication/login/login.service';

@Component({
  selector: 'app-chamados-add',
  templateUrl: './chamados-add.component.html',
  styleUrls: ['./chamados-add.component.css']
})
export class ChamadosAddComponent implements OnInit {

  page: PoPageDefault = {
    title: '',
    actions: [
      {
        label: 'Registrar', action: () => {
          this.registrarChamado()
        }
      },
      {
        label: 'Voltar', action: () => {
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
    subtipoChamado: <PoSelectOption[]>[]
  }

  constValue = {
    tipoChamado: '',
    visibilidade: <boolean>false
  }

  chamadosForm: FormGroup = this.fb.group({
    idEmpresa: ['', []],
    idAnalista: ['', []],
    idUsuario: ['', []],
    dataAbertura: ['', [Validators.required]],
    horaAbertura: ['', [Validators.required]],
    dataFechamento: ['', []],
    horaFechamento: ['', []],
    tempoChamado: ['', []],
    codigoStatusChamado: ['', []],
    tipoChamado: ['', [Validators.required]],
    subtipoChamado: ['', [Validators.required]],
    descricaoChamado: ['', [Validators.required]],
    solucaoChamado: ['', []]
  })

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private utilService: UtilService,
    private tipoChamadoService: TipoChamadoService,
    private subtipoChamadoService: SubtipoChamadoService,
    private chamadosService: ChamadosService,
    private notificationService: PoNotificationService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.externoInterno();
    this.tipoTela(this.constValue.tipoChamado);
    this.controls.dataAbertura.setValue(this.utilService.dataAtual());
    this.controls.horaAbertura.setValue(this.utilService.horaAtual());
    this.tipoChamado();
    this.chamadosForm
      .valueChanges
      .subscribe((_) => {
        this.page.actions[0].disabled = this.chamadosForm.invalid;
      })
    this.controls.tipoChamado
      .valueChanges.subscribe((data) => {
        this.subtipoChamado(data);
      })
  }

  get controls() {
    return this.chamadosForm.controls;
  }

  private externoInterno() {
    if (this.router.url.toString().indexOf('externo') != -1) {
      this.constValue.tipoChamado = 'externo';
      this.controls.codigoStatusChamado.setValue(1);
    } else {
      this.constValue.tipoChamado = 'interno';
    }
  }

  private tipoTela(tipoChamado) {
    let item: PoBreadcrumbItem[] = [];
    if (tipoChamado == 'externo') {
      this.constValue.visibilidade = false;
      this.page.title = 'Adicionar Chamado Externo';
      item = [
        { label: 'Externo' },
        { label: 'Adicionar' }
      ]
    } else {
      this.constValue.visibilidade = true;
      this.page.title = 'Adicionar Chamado Interno';
      item = [
        { label: 'Interno' },
        { label: 'Adicionar' }
      ]
    }
    item.map((item) => {
      this.page.breadcrumb.items.push(item);
    })
  }

  private tipoChamado() {
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

  registrarChamado() {
    this.controls.idAnalista.value == '' || this.controls.idAnalista.value == null ?
      this.controls.idAnalista.setValue(1) : this.controls.idAnalista.setValue(this.controls.idAnalista.value);
    this.controls.codigoStatusChamado.value == '' || this.controls.codigoStatusChamado.value == '' ?
      this.controls.codigoStatusChamado.setValue(1) :
      this.controls.codigoStatusChamado.setValue(this.controls.codigoStatusChamado.value);

    let user: User;
    let empresaId: number
    this.loginService.getUserInformation$.subscribe((data) => {
      user = data;
      empresaId = data.idEmpresa.id
    })
    user.authorities = []
    let chamado = {
      idChamado: '',
      idEmpresa: { id: empresaId },
      idAnalista: { id: parseInt(this.controls.idAnalista.value, 10) },
      idUsuario: user,
      dataAbertura: this.controls.dataAbertura.value,
      horaAbertura: this.controls.horaAbertura.value,
      dataFechamento: this.controls.dataFechamento.value,
      horaFechamento: this.controls.horaFechamento.value,
      tempoChamado: this.controls.tempoChamado.value,
      codigoStatusChamado: parseInt(this.controls.codigoStatusChamado.value, 10),
      tipoChamado: { id: parseInt(this.controls.tipoChamado.value, 10) },
      subtipoChamado: { id: parseInt(this.controls.subtipoChamado.value, 10) },
      descricaoChamado: this.controls.descricaoChamado.value,
      solucaoChamado: this.controls.solucaoChamado.value
    }

    console.log(chamado);
    

    this.chamadosService
      .createChamado(chamado)
      .subscribe((data) => {
        console.log(data);
        
        this.notificationService.success('Chamado aberto com sucesso!');
        this.location.back();
      },
        (error: any) => {
          this.notificationService.error(error.error.error);
          return;
        })
  }
}
