import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { EmpresaService } from 'src/app/services/cadastros/empresa/empresa.service';
import { PoNotificationService, PoPageDefault, PoSelectOption } from '@portinari/portinari-ui';
import { Empresa } from 'src/app/interfaces/empresa.model';

@Component({
  selector: 'app-company-add',
  templateUrl: './company-add.component.html',
  styleUrls: ['./company-add.component.css']
})
export class CompanyAddComponent implements OnInit {

  page: PoPageDefault = {
    actions: [
      { label: 'Salvar', disabled: true, action: () => { this.registrarEmpresa(this.companyAddForm.value) } },
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

  companyAddForm: FormGroup = this.fb.group({
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
    this.companyAddForm.
      valueChanges.subscribe((data) => {
        this.page.actions[0].disabled = this.companyAddForm.invalid;
      })
  }

  registrarEmpresa(empresa) {
    if (this.companyAddForm.invalid) {
      this.notificationService.warning('Formulário Inválido!');
      return;
    } else {
      this.empresaService
        .createEmpresa(empresa)
        .subscribe((data) => {
          this.notificationService.success('Empresa cadastrada com sucesso!');
          this.location.back();
        })
    }
  }

}

