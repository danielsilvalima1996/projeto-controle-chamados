import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoSelectOption, PoNotificationService } from '@portinari/portinari-ui';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { EmpresaService } from 'src/app/services/cadastros/empresa/empresa.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-empresa-add',
  templateUrl: './empresa-add.component.html',
  styleUrls: ['./empresa-add.component.css']
})
export class EmpresaAddComponent implements OnInit {

  page: PoPageDefault = {
    actions: [
      { label: 'Salvar', disabled: true, action: () => { this.registrarEmpresa(this.empresaAddForm.value) } },
      { label: 'Cancelar', action: () => { this.location.back() } },
    ],

    title: 'Adicionar Empresas',
    breadcrumb: {
      items: [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Empresas' },
        { label: 'Adicionar Empresas' },
      ]
    },
  }

  selects = {
    active: <PoSelectOption[]>[
      { label: 'ATIVO', value: 'true ' },
      { label: 'INATIVO', value: 'false' }
    ]
  }

  empresaAddForm: FormGroup = this.fb.group({
    cnpj: ['', [Validators.required]],
    nomeFantasia: ['', [Validators.required]],
    razaoSocial: ['', [Validators.required]],
    endereco: ['', [Validators.required]],
    codigoTotvs: ['', [Validators.required]],
    admin: ['', [Validators.required]],
    telefone: ['', [Validators.required]],
    celular: ['', [Validators.required]],
    ativo: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private empresaService: EmpresaService,
    private notificationService: PoNotificationService
  ) { }

  ngOnInit() {
    this.empresaAddForm.
      valueChanges.subscribe((data) => {
        this.page.actions[0].disabled = this.empresaAddForm.invalid;
      })
  }

  get controls() {
    return this.empresaAddForm.controls;
  }

  registrarEmpresa(empresa) {
    if (this.empresaAddForm.invalid) {
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
          this.notificationService.error(error.error.meta.message);
        })
    }
  }

  verificaCnpj() {
    if (this.controls.cnpj.value == null || this.controls.cnpj.value == '') {
      return;
    } else {
      this.empresaService
        .verificaCnpj(this.controls.cnpj.value)
        .subscribe((data) => {
          if (data) {
            this.notificationService.error('CNPJ já cadastrado!');
            this.page.actions[0].disabled = true;
          } else {
            this.notificationService.success('CNPJ válido!');
          }
        })
    }
  }

  verificaCodigoTotvs(){
    if (this.controls.codigoTotvs.value == null || this.controls.codigoTotvs.value == '') {
      return;
    } else {
      this.empresaService
        .verificaCodigoTotvs(this.controls.codigoTotvs.value)
        .subscribe((data) => {
          if (data) {
            this.notificationService.error('CodigoTotvs já cadastrado!');
            this.page.actions[0].disabled = true;
          } else {
            this.notificationService.success('CodigoTotvs válido!');
          }
        })
    }
  }

}


