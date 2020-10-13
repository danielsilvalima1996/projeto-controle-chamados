import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoSelectOption, PoNotificationService, PoDialogService, PoBreadcrumbItem, PoBreadcrumb } from '@po-ui/ng-components';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TipoChamado } from 'src/app/interfaces/tipo-chamado.model';
import { Location } from '@angular/common';
import { TipoChamadoService } from 'src/app/services/chamados/tipo-chamado/tipo-chamado.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-tipo-chamado-edit',
  templateUrl: './tipo-chamado-edit.component.html',
  styleUrls: ['./tipo-chamado-edit.component.css']
})
export class TipoChamadoEditComponent implements OnInit {

  public page: PoPageDefault = {
    title: '',
    breadcrumb: <PoBreadcrumb>{
      items: <PoBreadcrumbItem[]>[]
    },
    actions: []
  }


  tipoChamadoEditForm: FormGroup = this.fb.group({
    id: ['', []],
    descricao: ['', [Validators.required]],
    ativo: ['', []],
    criado: ['', []],
    modificado: ['', []],
    criadoPor: ['', []],
    modificadoPor: ['', []]
  })

  public disabledId: boolean = false;
  public disabledFields: boolean = false;
  private idTipoChamado: string = '';
  public loading: boolean = false;
  public tipoTela: string;

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private tipoChamadoService: TipoChamadoService,
    private notificationService: PoNotificationService,
    private router: Router,
    private dialog: PoDialogService
  ) { }

  // ngOnInit() {
  //   this.tipoChamadoEditForm.valueChanges.subscribe((_) => {
  //     this.page.actions[0].disabled = this.tipoChamadoEditForm.invalid;
  //   })

  //   this.route.paramMap
  //     .subscribe((params: ParamMap) => {
  //       this.idTipoChamado = params.get('id');
  //     })
  //   this.getDetailById(this.idTipoChamado);
  // }
  ngOnInit() {
    if (this.router.url.indexOf('add') != -1) {
      this.tipoTela = 'add';
      this.page.title = 'Adicionar Tipo Chamado';
      this.disabledId = true;
      this.page.breadcrumb.items = [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Tipo Chamado' },
        { label: 'Adicionar Tipo Chamado' }
      ],
        this.page.actions = [
          { label: 'Salvar', disabled: true, action: () => { this.cadastrarTipoChamado(this.tipoChamadoEditForm.value) } },
          { label: 'Cancelar', action: () => { this.dialogVoltar() } }
        ];
      this.tipoChamadoEditForm.valueChanges
        .subscribe((_) => {
          this.page.actions[0].disabled = this.tipoChamadoEditForm.invalid;
        });
    } else if (this.router.url.indexOf('edit') != -1) {
      this.tipoTela = 'edit';
      this.page.title = 'Editar Tipo Chamado';
      this.disabledId = true;
      this.page.breadcrumb.items = [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Tipo Chamado' },
        { label: 'Editar Tipo Chamado' }
      ],
        this.page.actions = [
          { label: 'Salvar', disabled: true, action: () => { this.alterTipoChamado(this.tipoChamadoEditForm.value) } },
          { label: 'Cancelar', action: () => { this.dialogVoltar() } }
        ];

      this.route.paramMap
        .subscribe((paramMap: ParamMap) => {
          this.idTipoChamado = paramMap.get('id');
        })
      this.getDetailById(this.idTipoChamado);
      this.tipoChamadoEditForm.valueChanges
        .subscribe((_) => {
          this.page.actions[0].disabled = this.tipoChamadoEditForm.invalid;
        });
    } else {
      this.tipoTela = 'view';
      this.page.title = 'Visualizar Tipo Chamado';
      this.disabledId = true;
      this.disabledFields = true;
      this.page.breadcrumb.items = [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Tipo Chamado' },
        { label: 'Visualizar Tipo Chamado' }
      ],
        this.page.actions = [
          { label: 'Salvar', disabled: true },
          { label: 'Cancelar', action: () => this.router.navigate(['cadastros/tipo-chamado/']) }
        ];
      this.route.paramMap
        .subscribe((paramMap: ParamMap) => {
          this.idTipoChamado = paramMap.get('id');
        })
      this.getDetailById(this.idTipoChamado);
    }
  }

  get controls() {
    return this.tipoChamadoEditForm.controls;
  }


  getDetailById(id) {
    this.loading = true;
    this.tipoChamadoService
      .findById(id)
      .subscribe((data) => {
        data.criado = new Date(data.criado);
        data.modificado = new Date(data.modificado);
        this.tipoChamadoEditForm.setValue(data);
        this.loading = false;
      },
        (error: HttpErrorResponse) => {
          this.notificationService.error(`Tipo Chamado ${id} não encontrado`);
          this.router.navigate(['cadastros/tipo-chamado/'])
          this.loading = false;
        })
  }

  alterTipoChamado(tipoChamado: TipoChamado) {
    this.loading = true;
    if (this.tipoChamadoEditForm.invalid) {
      this.notificationService.warning('Formulário Inválido!');
      this.loading = false;
      return;
    } else {
      this.tipoChamadoService
        .alterTipoChamado(tipoChamado)
        .subscribe((data) => {
          this.notificationService.success('Tipo chamado alterado com sucesso!');
          this.router.navigate(['cadastros/tipo-chamado/']);
          this.loading = false;
        },
          (error: HttpErrorResponse) => {
            console.error(error['message'])
            this.loading = false;
          })
    }
  }

  cadastrarTipoChamado(tipoChamado: TipoChamado) {
    this.loading = true;
    if (this.tipoChamadoEditForm.invalid) {
      this.notificationService.warning('Formulário Inválido!');
      this.loading = false;
      return;
    } else {
      this.tipoChamadoService
        .createTipoChamado(tipoChamado)
        .subscribe((data: any) => {
          this.notificationService.success('Tipo Chamado cadastrado com sucesso!');
          this.router.navigate(['cadastros/tipo-chamado/view', data.id]);
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
      confirm: () => this.router.navigate(['cadastros/tipo-chamado/']),
      title: 'Alerta',
      message: 'Salve para não perder os dados. Deseja voltar a tela de listagem?'
    })
  }

  // verificaDescricao(){
  //   if (this.controls.descricao.value == null || this.controls.descricao.value == '') {
  //     return;
  //   } else {
  //     this.tipoChamadoService
  //       .verificaDescricao(this.controls.descricao.value)
  //       .subscribe((data) => {
  //         if (data) {
  //           this.notificationService.error('Descrição já cadastrada!');
  //           this.page.actions[0].disabled = true;
  //         } else {
  //           this.notificationService.success('Descrição válida!');
  //         }
  //       })
  //   }
  // }

}

