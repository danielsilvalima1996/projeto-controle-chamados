import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoSelectOption, PoNotificationService, PoDialogService, PoBreadcrumb, PoBreadcrumbItem } from '@po-ui/ng-components';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { EmpresaService } from 'src/app/services/cadastros/empresa/empresa.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Empresa } from 'src/app/interfaces/empresa.model';

@Component({
  selector: 'app-empresa-add',
  templateUrl: './empresa-add.component.html',
  styleUrls: ['./empresa-add.component.css']
})
export class EmpresaAddComponent implements OnInit {

  public page: PoPageDefault = {
    title: '',
    breadcrumb: <PoBreadcrumb>{
      items: <PoBreadcrumbItem[]>[]
    },
    actions: []
  }

  selects = {
    active: <PoSelectOption[]>[
      { label: 'ATIVO', value: 'true ' },
      { label: 'INATIVO', value: 'false' }
    ]
  }

  public disabledId: boolean = false;
  public disabledFields: boolean = false;
  private id: string = '';
  public loading: boolean;
  public tipoTela: string;

  empresaForm: FormGroup = this.fb.group({
    cnpj: ['', [Validators.required, Validators.minLength(14)]],
    nomeFantasia: ['', [Validators.required]],
    razaoSocial: ['', [Validators.required]],
    cep: ['', [Validators.required, Validators.minLength(8)]],
    logradouro: ['', [Validators.required]],
    bairro: ['', [Validators.required]],
    localidade: ['', [Validators.required]],
    uf: ['', [Validators.required]],
    numero: ['', [Validators.required]],
    ativo: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private empresaService: EmpresaService,
    private notificationService: PoNotificationService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: PoDialogService
  ) { }

  ngOnInit() {
    if (this.router.url.indexOf('add') != -1) {
      this.tipoTela = 'add';
      this.page.title = 'Adicionar Empresa';
      this.disabledId = true;
      this.page.breadcrumb.items = [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Empresa' },
        { label: 'Adicionar Empresa' }
      ],
        this.page.actions = [
          { label: 'Salvar', disabled: true, action: () => { this.registrarEmpresa(this.empresaForm.value) } },
          { label: 'Cancelar', action: () => { this.dialogVoltar() } }
        ];
      this.empresaForm.valueChanges
        .subscribe((_) => {
          this.page.actions[0].disabled = this.empresaForm.invalid;
        });
    } else if (this.router.url.indexOf('edit') != -1) {
      this.tipoTela = 'edit';
      this.page.title = 'Editar Empresa';
      this.disabledId = true;
      this.page.breadcrumb.items = [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Empresa' },
        { label: 'Editar Empresa' }
      ],
        this.page.actions = [
          { label: 'Salvar', disabled: true, action: () => { this.alterarEmpresa(this.empresaForm.value) } },
          { label: 'Cancelar', action: () => { this.dialogVoltar() } }
        ];

      this.route.paramMap
        .subscribe((paramMap: ParamMap) => {
          this.id = paramMap.get('id');
        })
      this.getDetailById(this.id);
      this.empresaForm.valueChanges
        .subscribe((_) => {
          this.page.actions[0].disabled = this.empresaForm.invalid;
        });
    } else {
      this.tipoTela = 'view';
      this.page.title = 'Visualizar Empresa';
      this.disabledId = true;
      this.disabledFields = true;
      this.page.breadcrumb.items = [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Empresa' },
        { label: 'Visualizar Empresa' }
      ],
        this.page.actions = [
          { label: 'Salvar', disabled: true },
          { label: 'Cancelar', action: () => this.router.navigate(['cadastros/empresa/']) }
        ];
      this.route.paramMap
        .subscribe((paramMap: ParamMap) => {
          this.id = paramMap.get('id');
        })
      this.getDetailById(this.id);
    }

  }

  get controls() {
    return this.empresaForm.controls;
  }

  registrarEmpresa(empresa) {
    if (this.empresaForm.invalid) {
      this.notificationService.warning('Formulário Inválido!');
      return;
    } else {
      this.empresaService
        .createEmpresa(empresa)
        .subscribe((data) => {
          this.notificationService.success('Empresa cadastrada com sucesso!');
          this.location.back();
        },
          (error: HttpErrorResponse) => {
            this.loading = false;
            this.notificationService.error(error.error.meta.message);
          })
    }
  }

  getDetailById(id) {
    this.loading = true;
    this.empresaService
      .findById(id)
      .subscribe((data) => {
        this.empresaForm.setValue(data);
        this.loading = false;
      },
        (error: HttpErrorResponse) => {
          this.notificationService.error(`Empresas ${id} não encontrada`);
          this.router.navigate(['cadastros/empresa/'])
          this.loading = false;
        })
  }

  alterarEmpresa(empresa: Empresa) {
    this.loading = true;
    if (this.empresaForm.invalid) {
      this.notificationService.warning('Formulário Inválido!');
      this.loading = false;
      return;
    } else {
      this.empresaService
        .alterEmpresa(empresa)
        .subscribe((data) => {
          this.notificationService.success('Empresa alterada com sucesso!');
          this.router.navigate(['cadastros/empresa/']);
          this.loading = false;
        },
          (error: HttpErrorResponse) => {
            console.error(error['message'])
            this.loading = false;
          })
    }
  }

  private dialogVoltar() {
    this.dialog.confirm({
      confirm: () => this.router.navigate(['cadastros/empresa/']),
      title: 'Alerta',
      message: 'Salve para não perder os dados. Deseja voltar a tela de listagem?'
    })
  }

}


