import { Component, OnInit, ErrorHandler } from '@angular/core';
import { PoPageDefault, PoBreadcrumbItem, PoSelectOption, PoNotification, PoNotificationService } from '@po-ui/ng-components';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UtilService } from 'src/app/services/utils/util-service/util.service';
import { TipoChamadoService } from 'src/app/services/chamados/tipo-chamado/tipo-chamado.service';
import { SubtipoChamadoService } from 'src/app/services/chamados/subtipo-chamado/subtipo-chamado.service';
import { ChamadosService } from 'src/app/services/chamados/chamados/chamados.service';
import { identifierModuleUrl } from '@angular/compiler';
import { User } from 'src/app/interfaces/user.model';
import { LoginRetorno } from 'src/app/interfaces/login.model';
import { LoginService } from 'src/app/services/authentication/login/login.service';
import { AnalistaService } from 'src/app/services/cadastros/analista/analista.service';
import { UserService } from 'src/app/services/cadastros/users/user.service';
import { EmpresaService } from 'src/app/services/cadastros/empresa/empresa.service';

@Component({
  selector: 'app-chamados-add',
  templateUrl: './chamados-add.component.html',
  styleUrls: ['./chamados-add.component.css']
})
export class ChamadosAddComponent implements OnInit {

  page: PoPageDefault = {
    title: 'Adicionar Chamado',
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
        { label: 'Chamados' },
        { label: 'Adicionar' }
      ]
    }
  }

  selects = {
    tipoChamado: <PoSelectOption[]>[],
    subtipoChamado: <any[]>[],
    analistas: <PoSelectOption[]>[],
    empresas: <PoSelectOption[]>[],
    usuarios: <PoSelectOption[]>[],
    status: <PoSelectOption[]>[
      { label: 'Aberto', value: 1 },
      { label: 'Em Análise', value: 2 },
      { label: 'Fechado', value: 3 },
      { label: 'Indeferido', value: 4 }
    ]
  }

  constValue = {
    tipoChamado: '',
    visibilidade: <boolean>false,
    user: <User>{},
    dataAtual: ''
  }

  // chamadosFormInterno: FormGroup = this.fb.group({
  //   idEmpresa: ['', []],
  //   idAnalista: ['', []],
  //   idUsuario: ['', []],
  //   dataAbertura: ['', [Validators.required]],
  //   horaAbertura: ['', [Validators.required]],
  //   dataFechamento: ['', []],
  //   horaFechamento: ['', []],
  //   tempoChamado: ['', []],
  //   codigoStatusChamado: ['', []],
  //   tipoChamado: ['', [Validators.required]],
  //   subtipoChamado: ['', [Validators.required]],
  //   descricaoChamado: ['', [Validators.required]],
  //   solucaoChamado: ['', []]
  // })

  // chamadosFormExterno: FormGroup = this.fb.group({
  //   idEmpresa: ['', []],
  //   idAnalista: ['', []],
  //   idUsuario: ['', []],
  //   dataAbertura: ['', [Validators.required]],
  //   horaAbertura: ['', [Validators.required]],
  //   dataFechamento: ['', []],
  //   horaFechamento: ['', []],
  //   tempoChamado: ['', []],
  //   codigoStatusChamado: ['', []],
  //   tipoChamado: ['', [Validators.required]],
  //   subtipoChamado: ['', [Validators.required]],
  //   descricaoChamado: ['', [Validators.required]],
  //   solucaoChamado: ['', []]
  // })

  chamadosForm: FormGroup = this.fb.group({
    descricao: ['', [Validators.required]],
    idSubtipoChamado: ['', [Validators.required]],
    idTipoChamado: ['', [Validators.required]],
    idUsuario: ['', [Validators.required]]
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
    private loginService: LoginService,
    private analistaService: AnalistaService,
    private userService: UserService,
    private empresaService: EmpresaService,
    private usuariosService: UserService,
  ) { }

  ngOnInit() {
    // this.constValue.dataAtual = this.utilService.dataAtual();
    // this.externoInterno();
    // this.analistas();
    // this.empresas();
    // this.tipoTela(this.constValue.tipoChamado);
    // this.controls.dataAbertura.setValue(this.utilService.dataAtual());
    // this.controls.horaAbertura.setValue(this.utilService.horaAtual());
    // this.tipoChamado();

    this.retornaUsuarios();
    this.retornaTipoChamado();
    this.retornaSubtipoChamado();
    // this.chamadosFormInterno
    //   .valueChanges
    //   .subscribe((_) => {
    //     this.page.actions[0].disabled = this.chamadosFormInterno.invalid;
    //   })
    // this.chamadosFormExterno
    //   .valueChanges
    //   .subscribe((_) => {
    //     this.page.actions[0].disabled = this.chamadosFormExterno.invalid;

    //   })
    this.chamadosForm
      .valueChanges
      .subscribe((_) => {
        this.page.actions[0].disabled = this.chamadosForm.invalid;

      })
    this.controls.idTipoChamado
      .valueChanges.subscribe((data) => {
        console.log(data);

        if (data === undefined || data === '' || data === null) {
          this.controls.idSubtipoChamado.setValue([])
          return;
        } else {
          const tipoChamado = this.selects.subtipoChamado.filter((item) => item.idTipoChamado === data)
          this.selects.subtipoChamado = tipoChamado;
          console.log(this.selects.subtipoChamado);

        }
      })


    // this.controls.idEmpresa
    //   .valueChanges.subscribe((data) => {
    //     if (data == undefined || data == '') {
    //       this.selects.users = [];
    //       return;
    //     } else {
    //       this.users(data);
    //     }
    //   })

    // this.controls.dataFechamento
    //   .valueChanges.subscribe((data) => {
    //     if (data == null || data == '') {
    //       this.controls.horaFechamento.setValue(null);
    //     } else {
    //       this.controls.horaFechamento.setValue(this.utilService.horaAtual());
    //       this.controls.codigoStatusChamado.setValue(3);
    //     }
    //   })

    // this.controls.idUsuario
    //   .valueChanges.subscribe((data) => {
    //     this.userById(data);
    //   })
  }

  get controls() {
    // if (this.constValue.tipoChamado == 'externo') {
    return this.chamadosForm.controls;
    // } else {
    // return this.chamadosFormInterno.controls;
    // }
  }

  private retornaSubtipoChamado() {
    this.subtipoChamadoService
      .findSubtipoChamado()
      .subscribe((data: any) => {
        let arr = data.map((item) => {
          return <any>{ label: item.descricao, value: item.id, idTipoChamado: item.idTipoChamado.id }
        })
        this.selects.subtipoChamado = arr;
      })
  }


  private retornaTipoChamado() {
    this.tipoChamadoService.findAll('ativo=true')
      .subscribe((data: any) => {
        let arr = data.map((item) => {
          return <PoSelectOption>{ label: item.descricao, value: item.id };
        })
        this.selects.tipoChamado = arr;
        console.log(this.selects.tipoChamado);

      })
  }

  private retornaUsuarios() {
    this.usuariosService
      .getUser("ativo=true")
      .subscribe((data: any) => {
        let arr = data.map((item) => {
          return <PoSelectOption>{ label: `${item.nomeCompleto}`, value: item.id }
        })
        this.selects.usuarios = arr;
      })
  }

  // private externoInterno() {
  //   if (this.router.url.toString().indexOf('externo') != -1) {
  //     this.constValue.tipoChamado = 'externo';
  //     this.controls.codigoStatusChamado.setValue(1);
  //   } else {
  //     this.constValue.tipoChamado = 'interno';
  //   }
  // }


  // private tipoTela(tipoChamado) {
  //   let item: PoBreadcrumbItem[] = [];
  //   if (tipoChamado == 'externo') {
  //     this.constValue.visibilidade = false;
  //     this.page.title = 'Adicionar Chamado Externo';
  //     item = [
  //       { label: 'Externo' },
  //       { label: 'Adicionar' }
  //     ]
  //   } else {
  //     this.constValue.visibilidade = true;
  //     this.page.title = 'Adicionar Chamado Interno';
  //     item = [
  //       { label: 'Interno' },
  //       { label: 'Adicionar' }
  //     ]
  //   }
  //   item.map((item) => {
  //     this.page.breadcrumb.items.push(item);
  //   })
  // }

  private tipoChamado() {
    // this.tipoChamadoService
    //   .findAll()
    //   .subscribe((data) => {
    //     let arr = data.map((item) => {
    //       return <PoSelectOption>{ label: item.descricao, value: item.id };
    //     })
    //     this.selects.tipoChamado = arr;
    //   })
  }

  // private subtipoChamado(id: number) {
  //   this.subtipoChamadoService
  //     .findAllByTipo(id)
  //     .subscribe((data) => {
  //       let arr = data.map((item) => {
  //         return <PoSelectOption>{ label: item.descricao, value: item.id }
  //       })
  //       this.selects.subtipoChamado = arr;
  //     })
  // }

  // private analistas() {
  //   this.analistaService
  //     .findAllAtivo()
  //     .subscribe((data) => {
  //       let arr = data.map((item) => {
  //         return <PoSelectOption>{ label: item.nome, value: item.id }
  //       })
  //       this.selects.analistas = arr;
  //     })
  // }

  // private empresas() {
  //   this.empresaService
  //     .findAllAtivo()
  //     .subscribe((data) => {
  //       let arr = data.map((item) => {
  //         return <PoSelectOption>{ label: item.nomeFantasia, value: item.id }
  //       })
  //       this.selects.empresas = arr;
  //     })
  // }

  // private users(id: number) {
  //   this.userService
  //     .findAllEmpresa(id)
  //     .subscribe((data: any) => {
  //       if (data.length > 0) {
  //         let arr = data.map((item) => {
  //           return <PoSelectOption>{ label: item.fullName, value: item.id }
  //         })
  //         this.selects.users = arr;
  //       }
  //     })
  // }

  // private userById(id: number) {
  //   this.userService
  //     .findById(id)
  //     .subscribe((data) => {
  //       this.constValue.user = data;
  //     })
  // }

  registrarChamado() {
    let chamado;
    // let user: User;
    // if (this.constValue.tipoChamado == 'externo') {
    //   // let dataFechamento: string;
    //   let empresaId: number
    //   this.controls.idAnalista.value == '' || this.controls.idAnalista.value == null ?
    //     this.controls.idAnalista.setValue(1) : this.controls.idAnalista.setValue(this.controls.idAnalista.value);
    //   this.controls.codigoStatusChamado.value == '' || this.controls.codigoStatusChamado.value == '' ?
    //     this.controls.codigoStatusChamado.setValue(1) :
    //     this.controls.codigoStatusChamado.setValue(this.controls.codigoStatusChamado.value);

    //   this.loginService
    //     .getUserInformation$
    //     .subscribe((data: any) => {
    //       user = data;
    //       empresaId = data.idEmpresa.id
    //     })
    // user.authorities = [];
    chamado = {
      descricao: this.controls.descricao.value,
      idSubtipoChamado: {
        id: this.controls.idSubtipoChamado.value
      },
      idTipoChamado: {
        id: this.controls.idTipoChamado.value
      },
      idUsuario: {
        id: this.controls.idUsuario.value
      }

      // idChamado: '',
      // idEmpresa: { id: empresaId },
      // idAnalista: { id: parseInt(this.controls.idAnalista.value, 10) },
      // idUsuario: user,
      // dataAbertura: this.controls.dataAbertura.value,
      // horaAbertura: this.controls.horaAbertura.value.replace(/[^0-9]/g, ''),
      // dataFechamento: this.controls.dataFechamento.value,
      // horaFechamento: this.controls.horaFechamento.value.replace(/[^0-9]/g, ''),
      // tempoChamado: this.controls.tempoChamado.value.replace(/[^0-9]/g, ''),
      // codigoStatusChamado: parseInt(this.controls.codigoStatusChamado.value, 10),
      // tipoChamado: { id: parseInt(this.controls.tipoChamado.value, 10) },
      // subtipoChamado: { id: parseInt(this.controls.subtipoChamado.value, 10) },
      // descricaoChamado: this.controls.descricaoChamado.value,
      // solucaoChamado: this.controls.solucaoChamado.value
    }
    // } 

    // else {
    //   // this.constValue.user.authorities = [];
    //   let horaAbertura;
    //   let horaFechamento;
    //   let tempoChamado;
    //   this.controls.horaAbertura.value == null ? horaAbertura = '' : horaAbertura = this.controls.horaAbertura.value.replace(/[^0-9]/g, '');
    //   this.controls.horaFechamento.value == null ? horaFechamento = '' : horaFechamento = this.controls.horaFechamento.value.replace(/[^0-9]/g, '');
    //   this.controls.tempoChamado.value == null ? tempoChamado = '' : tempoChamado = this.controls.tempoChamado.value.replace(/[^0-9]/g, '');
    //   chamado = {
    //     idChamado: '',
    //     idEmpresa: { id: this.controls.idEmpresa.value },
    //     idAnalista: { id: parseInt(this.controls.idAnalista.value, 10) },
    //     idUsuario: this.constValue.user,
    //     dataAbertura: this.controls.dataAbertura.value,
    //     horaAbertura: horaAbertura,
    //     dataFechamento: this.controls.dataFechamento.value,
    //     horaFechamento: horaFechamento,
    //     tempoChamado: tempoChamado,
    //     codigoStatusChamado: parseInt(this.controls.codigoStatusChamado.value, 10),
    //     tipoChamado: { id: parseInt(this.controls.tipoChamado.value, 10) },
    //     subtipoChamado: { id: parseInt(this.controls.subtipoChamado.value, 10) },
    //     descricaoChamado: this.controls.descricaoChamado.value,
    //     solucaoChamado: this.controls.solucaoChamado.value
    //   }
    // }

    this.chamadosService
      .createChamado(chamado)
      .subscribe((data) => {

        this.notificationService.success('Chamado aberto com sucesso!');
        this.location.back();
      },
        (error: any) => {
          this.notificationService.error(error.error.error);
          return;
        })
  }
}
