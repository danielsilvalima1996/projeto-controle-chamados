import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoSelectOption, PoNotificationService } from '@po-ui/ng-components';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UtilService } from 'src/app/services/utils/util-service/util.service';
import { TipoChamadoService } from 'src/app/services/chamados/tipo-chamado/tipo-chamado.service';
import { SubtipoChamadoService } from 'src/app/services/chamados/subtipo-chamado/subtipo-chamado.service';
import { ChamadosService } from 'src/app/services/chamados/chamados/chamados.service';
import { Usuario } from 'src/app/interfaces/usuario.model';
import { LoginService } from 'src/app/services/authentication/login/login.service';
import { Tecnico } from 'src/app/interfaces/tecnico.model';

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
    tecnico: <PoSelectOption[]>[],
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
    user: <Usuario>{},
    dataAtual: ''
  }

  public loading: boolean;
  public disabledField = false;
  public disabledSubtipoChamado = false;
  public showUser = false;
  public showTecnico = false;
  public tipoTela = '';

  chamadosForm: FormGroup = this.fb.group({
    descricao: ['', [Validators.required]],
    idSubtipoChamado: [null, [Validators.required]],
    idTipoChamado: [null, [Validators.required]],
    idUsuario: [null, [Validators.required]],
    idTecnico: [null]
  })

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tipoChamadoService: TipoChamadoService,
    private subtipoChamadoService: SubtipoChamadoService,
    private chamadosService: ChamadosService,
    private notificationService: PoNotificationService,
    private loginService: LoginService,
    private utilService: UtilService
  ) { }

  ngOnInit() {

    const arr: Array<Usuario> = this.route.snapshot.data['usuarios'];

    arr.map((item) => {
      this.selects.usuarios.push(<PoSelectOption>{ label: item.nomeCompleto, value: item.id });
    });

    this.selects.usuarios = this.utilService.sortListas(this.selects.usuarios);


    const tecnicos: Array<Tecnico> = this.route.snapshot.data['tecnico'];
    tecnicos.map((item) => {
      this.selects.tecnico.push(<PoSelectOption>{ label: item.idUsuario.nomeCompleto, value: item.id })
    })

    this.selects.tecnico = this.utilService.sortListas(this.selects.tecnico);


    if (this.router.url.toString().indexOf('acompanhar-usuario') != -1) {
      this.tipoTela = 'acompanhar-usuario';
      this.loginService.getUserInformation$
        .subscribe((data) => {
          this.controls.idUsuario.setValue(data.id)
          this.disabledField = true;
        });
    } else {
      this.tipoTela = 'acompanhar-tecnico';
      this.showUser = true;
      this.showTecnico = true;
    }


    this.retornaTipoChamado();
    this.retornaSubtipoChamado();
    this.disabledSubtipoChamado = true;

    this.chamadosForm
      .valueChanges
      .subscribe((_) => {
        this.page.actions[0].disabled = this.chamadosForm.invalid;

      })
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
    return this.chamadosForm.controls;
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


  private retornaTipoChamado() {
    this.tipoChamadoService.findAll('ativo=true')
      .subscribe((data: any) => {
        console.log(data);
        let arr = data.map((item) => {
          return <PoSelectOption>{ label: item.descricao, value: item.id };
        })
        this.selects.tipoChamado = this.utilService.sortListas(arr);

      })
  }



  registrarChamado() {
    this.loading = true;
    let chamado;
    if (this.tipoTela === 'acompanhar-tecnico') {
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
        },
        idTecnico: this.controls.idTecnico.value != null ? { id: this.controls.idTecnico.value } : null
      }
    } else {
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
      }
    }
    this.chamadosService
      .createChamado(chamado)
      .subscribe((data) => {
        this.loading = false;
        this.notificationService.success('Chamado aberto com sucesso!');
        this.router.navigate([`chamados/${this.tipoTela}/view`, data.id]);
      },
        (error: any) => {
          this.loading = false;
          this.notificationService.error(error.error.error);
          return;
        })
  }
}
