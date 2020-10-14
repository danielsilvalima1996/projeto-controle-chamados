import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PoBreadcrumb, PoBreadcrumbItem, PoDialogService, PoNotificationService, PoPageDefault, PoSelectOption } from '@po-ui/ng-components';
import { SubtipoChamado } from 'src/app/interfaces/subtipo-chamado.model';
import { SubtipoChamadoService } from 'src/app/services/chamados/subtipo-chamado/subtipo-chamado.service';
import { TipoChamadoService } from 'src/app/services/chamados/tipo-chamado/tipo-chamado.service';
import { UtilService } from 'src/app/services/utils/util-service/util.service';

@Component({
  selector: 'app-subtipo-chamado-edit',
  templateUrl: './subtipo-chamado-edit.component.html',
  styleUrls: ['./subtipo-chamado-edit.component.css']
})
export class SubtipoChamadoEditComponent implements OnInit {

  public page: PoPageDefault = {
    title: '',
    breadcrumb: <PoBreadcrumb>{
      items: <PoBreadcrumbItem[]>[]
    },
    actions: []
  }

  selects = {
    tipoChamado: <PoSelectOption[]>[]
  }

  public disabledId: boolean = false;
  public disabledFields: boolean = false;
  private idSubTipoChamado: string = '';
  public loading: boolean = false;
  public tipoTela: string;

  subTipoChamadoForm: FormGroup = this.fb.group({
    id: ['', []],
    descricao: ['', [Validators.required, Validators.minLength(5)]],
    ativo: ['', []],
    criado: ['', []],
    modificado: ['', []],
    criadoPor: ['', []],
    modificadoPor: ['', []],
    idTipoChamado: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private subTipoChamadoService: SubtipoChamadoService,
    private notificationService: PoNotificationService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: PoDialogService,
    private tipoChamadoService: TipoChamadoService,
    private utilService: UtilService
  ) { }

  ngOnInit() {
    // this.route.paramMap.subscribe((param: ParamMap) => {
    //   this.getSubtipoChamado(parseInt(param.get('id'), 10));
    // })
    // let arr: Array<TipoChamado> = this.route.snapshot.data['tipoChamado'];
    // arr.map((item) => {
    //   this.selects.tipoChamado.push(<PoSelectOption>{ label: item.descricao, value: item.id })
    // })
    // this.subTipoChamadoEditForm.valueChanges.subscribe((_) => {
    //   this.page.actions[0].disabled = this.subTipoChamadoEditForm.invalid;
    // })
    if (this.router.url.indexOf('add') != -1) {
      this.tipoTela = 'add';
      this.page.title = 'Adicionar SubTipo Chamado';
      this.disabledId = true;
      this.page.breadcrumb.items = [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'SubTipo Chamado' },
        { label: 'Adicionar SubTipo Chamado' }
      ],
        this.page.actions = [
          { label: 'Salvar', disabled: true, action: () => { this.cadastrarSubTipoChamado(this.subTipoChamadoForm.value) } },
          { label: 'Cancelar', action: () => { this.dialogVoltar() } }
        ];
      this.subTipoChamadoForm.valueChanges
        .subscribe((_) => {
          this.page.actions[0].disabled = this.subTipoChamadoForm.invalid;
        });
      this.getTipoChamado();
    } else if (this.router.url.indexOf('edit') != -1) {
      this.tipoTela = 'edit';
      this.page.title = 'Editar SubTipo Chamado';
      this.disabledId = true;
      this.page.breadcrumb.items = [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'SubTipo Chamado' },
        { label: 'Editar SubTipo Chamado' }
      ],
        this.page.actions = [
          { label: 'Salvar', disabled: true, action: () => { this.alterSubTipoChamado(this.subTipoChamadoForm.value) } },
          { label: 'Cancelar', action: () => { this.dialogVoltar() } }
        ];

      this.route.paramMap
        .subscribe((paramMap: ParamMap) => {
          this.idSubTipoChamado = paramMap.get('id');
        })
      this.getDetailById(this.idSubTipoChamado);
      this.subTipoChamadoForm.valueChanges
        .subscribe((_) => {
          this.page.actions[0].disabled = this.subTipoChamadoForm.invalid;
        });
      this.getTipoChamado();
    } else {
      this.tipoTela = 'view';
      this.page.title = 'Visualizar SubTipo Chamado';
      this.disabledId = true;
      this.disabledFields = true;
      this.page.breadcrumb.items = [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'SubTipo Chamado' },
        { label: 'Visualizar SubTipo Chamado' }
      ],
        this.page.actions = [
          { label: 'Salvar', disabled: true },
          { label: 'Cancelar', action: () => this.router.navigate(['cadastros/subtipo-chamado/']) }
        ];
      this.route.paramMap
        .subscribe((paramMap: ParamMap) => {
          this.idSubTipoChamado = paramMap.get('id');
        })
      this.getDetailById(this.idSubTipoChamado);
      this.getTipoChamado();
    }
  }

  get controls() {
    return this.subTipoChamadoForm.controls;
  }

  // private getSubtipoChamado(id: number) {
  //   this.subTipoChamadoService
  //     .findById(id)
  //     .subscribe((data) => {
  //       let obj = {
  //         // id: data.id,
  //         // descricao: data.descricao,
  //         // active: data.active,
  //         // idTipoChamado: data.id,
  //         // created: data.created.toString().substr(0, 10),
  //         // modified: data.modified.toString().substr(0, 10)
  //       }
  //       this.subTipoChamadoForm.setValue(Object.assign({}, obj));
  //     })
  // }

  // private saveSubTipoChamado() {
  //   let subtipo = {
  //     id: this.controls.id.value,
  //     descricao: this.controls.descricao.value,
  //     active: this.controls.active.value,
  //     created: this.controls.created.value,
  //     modified: this.controls.modified.value,
  //     idTipoChamado: { id: this.controls.idTipoChamado.value }
  //   }
  //   this.subTipoChamadoService
  //     .alterSubTipoChamado(subtipo)
  //     .subscribe((data) => {
  //       this.notificationService.success('SubTipo de Chamado alterado com sucesso!');
  //       this.location.back();
  //     },
  //       (error: any) => {
  //         this.notificationService.error('Erro ao salvar SubTipoChamado!');
  //       })
  // }

  getTipoChamado() {
    this.tipoChamadoService.findAll('ativo=true')
      .subscribe((data) => {
        this.selects.tipoChamado = data.map((item) => {
          return <PoSelectOption>{ label: item.descricao, value: item.id };
        })
        this.selects.tipoChamado = this.utilService.sortListas(this.selects.tipoChamado);
      })
  }

  getDetailById(id) {
    this.loading = true;
    this.subTipoChamadoService
      .findById(id)
      .subscribe((data: any) => {
        data.criado = new Date(data.criado);
        data.modificado = new Date(data.modificado);
        data.idTipoChamado = data.idTipoChamado.id;
        this.subTipoChamadoForm.setValue(data);
        this.loading = false;
      },
        (error: HttpErrorResponse) => {
          this.notificationService.error(`SubTipo Chamado ${id} não encontrado`);
          this.router.navigate(['cadastros/subtipo-chamado/'])
          this.loading = false;
        })
  }

  alterSubTipoChamado(subtipoChamado: SubtipoChamado) {
    this.loading = true;
    if (this.subTipoChamadoForm.invalid) {
      this.notificationService.warning('Formulário Inválido!');
      this.loading = false;
      return;
    } else {
      let subtipo = {
        id: this.controls.id.value,
        descricao: this.controls.descricao.value,
        ativo: this.controls.ativo.value,
        idTipoChamado: { id: this.controls.idTipoChamado.value }
      }
      this.subTipoChamadoService
        .alterSubTipoChamado(subtipo)
        .subscribe((data) => {
          this.notificationService.success('SubTipo chamado alterado com sucesso!');
          this.router.navigate(['cadastros/subtipo-chamado/']);
          this.loading = false;
        },
          (error: HttpErrorResponse) => {
            console.error(error['message'])
            this.loading = false;
          })
    }
  }

  cadastrarSubTipoChamado(subtipoChamado: SubtipoChamado) {
    this.loading = true;
    if (this.subTipoChamadoForm.invalid) {
      this.notificationService.warning('Formulário Inválido!');
      this.loading = false;
      return;
    } else {
      let subtipo = {
        descricao: this.controls.descricao.value,
        ativo: this.controls.ativo.value,
        idTipoChamado: { id: this.controls.idTipoChamado.value }
      }
      this.subTipoChamadoService
        .createSubtipoChamado(subtipo)
        .subscribe((data: any) => {
          this.notificationService.success('Subtipo Chamado cadastrado com sucesso!');
          this.router.navigate(['cadastros/subtipo-chamado/view', data.id]);
          this.loading = false;
        },
          (error: HttpErrorResponse) => {
            this.notificationService.error(error['message'])
            console.error(error['message'])
            this.loading = false;
          })
    }
  }

  private dialogVoltar() {
    this.dialog.confirm({
      confirm: () => this.router.navigate(['cadastros/subtipo-chamado/']),
      title: 'Alerta',
      message: 'Salve para não perder os dados. Deseja voltar a tela de listagem?'
    })
  }

}
