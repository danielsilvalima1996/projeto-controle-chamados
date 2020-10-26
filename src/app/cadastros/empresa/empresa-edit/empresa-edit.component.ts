import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PoBreadcrumb, PoBreadcrumbItem, PoDialogService, PoInputComponent, PoNotification, PoNotificationService, PoPageDefault, PoSelectOption } from '@po-ui/ng-components';
import { debounceTime } from 'rxjs/operators';
import { Empresa } from 'src/app/interfaces/empresa.model';
import { ViaCep } from 'src/app/interfaces/via-cep.model';
import { EmpresaService } from 'src/app/services/cadastros/empresa/empresa.service';
import { ViaCepService } from 'src/app/services/cadastros/via-cep/via-cep.service';
const { cnpj } = require('cpf-cnpj-validator');
@Component({
  selector: 'app-empresa-edit',
  templateUrl: './empresa-edit.component.html',
  styleUrls: ['./empresa-edit.component.css']
})
export class EmpresaEditComponent implements OnInit {
  public page: PoPageDefault = {
    title: '',
    breadcrumb: <PoBreadcrumb>{
      items: <PoBreadcrumbItem[]>[]
    },
    actions: []
  }

  estados: Array<PoSelectOption> = [
    { label: "ACRE", value: "AC" },
    { label: "ALAGOAS", value: "AL" },
    { label: "AMAZONAS", value: "AM" },
    { label: "AMAPA", value: "AP" },
    { label: "BAHIA", value: "BA" },
    { label: "CEARA", value: "CE" },
    { label: "DISTRITO FEDERAL", value: "DF" },
    { label: "ESPIRITO SANTO", value: "ES" },
    { label: "GOIAS", value: "GO" },
    { label: "MARANHAO", value: "MA" },
    { label: "MINAS GERAIS", value: "MG" },
    { label: "MATO GROSSO DO SUL", value: "MS" },
    { label: "MATO GROSSO", value: "MT" },
    { label: "PARA", value: "PA" },
    { label: "PARAIBA", value: "PB" },
    { label: "PERNAMBUCO", value: "PE" },
    { label: "PIAUI", value: "PI" },
    { label: "PARANA", value: "PR" },
    { label: "RIO DE JANEIRO", value: "RJ" },
    { label: "RIO GRANDE DO NORTE", value: "RN" },
    { label: "RONDONIA", value: "RO" },
    { label: "RORAIMA", value: "RR" },
    { label: "RIO GRANDE DO SUL", value: "RS" },
    { label: "SANTA CATARINA", value: "SC" },
    { label: "SERGIPE", value: "SE" },
    { label: "SAO PAULO", value: "SP" },
    { label: "TOCANTINS", value: "TO" }
  ];


  public disabledId: boolean = false;
  public disabledFields: boolean = false;
  private id: string = '';
  public loading: boolean;
  public tipoTela: string;

  empresaForm: FormGroup = this.fb.group({
    id: ['', []],
    cnpj: ['', [Validators.required]],
    nomeFantasia: ['', [Validators.required]],
    razaoSocial: ['', [Validators.required]],
    cep: ['', [Validators.required]],
    logradouro: ['', [Validators.required]],
    bairro: ['', [Validators.required]],
    localidade: ['', [Validators.required]],
    uf: ['', [Validators.required]],
    numero: ['', [Validators.required]],
    ativo: [true, []],
    criado: ['', []],
    modificado: ['', []],
    complemento: ['', []],
    criadoPor: ['', []],
    modificadoPor: ['', []],
    isValid: [false, []]
  });

  @ViewChild('numeroInput', { static: true }) numeroInput: PoInputComponent;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private empresaService: EmpresaService,
    private notificationService: PoNotificationService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: PoDialogService,
    private viaCepService: ViaCepService
  ) { }


  ngOnInit() {
    if (this.router.url.indexOf('add') != -1) {
      this.tipoTela = 'add';
      this.page.title = 'Adicionar Empresa';
      this.disabledId = false;
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

      this.controls.cep.valueChanges
        .pipe(debounceTime(250))
        .subscribe((data: string) => {
          if (data.length == 8) {
            this.getCep(data);
          }
        });

      this.controls['cnpj'].valueChanges
        .subscribe((data) => {
          if (data.length === 14) {
            let result = cnpj.isValid(data);
            const poNotification: PoNotification = {
              message: result === false ? 'Insira um CNPJ válido' : 'CNPJ válido',
              duration: 2000
            }
            if (result === false) {
              this.page.actions[0].disabled = true;
              this.controls['cnpj'].setValue('');
              this.controls['isValid'].setValue(false);
              this.notificationService.warning(poNotification);
            } else if (result === true) {
              this.page.actions[0].disabled = false;
              this.controls['isValid'].setValue(true);
              this.notificationService.success(poNotification);
            }
          } else {
            this.controls['isValid'].setValue(false);
          }
        })

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
        .subscribe((data) => {
          this.page.actions[0].disabled = this.empresaForm.invalid;
        });

      this.controls.cep.valueChanges
        .pipe(debounceTime(250))
        .subscribe((data: string) => {
          console.log("data =>", data);

          if (data.length == 8) {
            this.getCep(data);
          } else if (data === undefined || data === '') {
            this.controls.logradouro.setValue('');
            this.controls.numero.setValue('');
            this.controls.bairro.setValue('');
            this.controls.localidade.setValue('');
            this.controls.uf.setValue('');
          }
        })

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
    this.loading = true;
    if (this.empresaForm.invalid) {
      this.notificationService.warning('Formulário Inválido!');
      return;
    } else {
      this.empresaService
        .createEmpresa(empresa)
        .subscribe((data) => {
          this.notificationService.success('Empresa cadastrada com sucesso!');
          this.loading = false;
          this.router.navigate(['cadastros/empresa/view', data.id]);
        },
          (error: HttpErrorResponse) => {
            this.notificationService.error(error.error.meta.message);
            this.loading = false;
          })
    }
  }

  getDetailById(id) {
    this.loading = true;
    this.empresaService
      .findById(id)
      .subscribe((data) => {
        data.isValid = false;
        data.criado = new Date(data.criado);
        data.modificado = new Date(data.modificado);
        this.empresaForm.setValue(data);
        this.loading = false;
      },
        (error: HttpErrorResponse) => {
          this.notificationService.error(`Empresa ${id} não encontrada`);
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

  public getCep(cep: string) {
    this.loading = true;
    this.viaCepService.getCep(cep)
      .subscribe((endereco: ViaCep) => {
        console.log(endereco);
        this.controls['bairro'].setValue(endereco.bairro);
        this.controls['localidade'].setValue(endereco.localidade);
        this.controls['uf'].setValue(endereco.uf);
        this.controls['logradouro'].setValue(endereco.logradouro);
        this.numeroInput.focus();
        this.loading = false;
      }, (error: HttpErrorResponse) => {
        console.error(error);
        this.loading = false;
      });
  }

}