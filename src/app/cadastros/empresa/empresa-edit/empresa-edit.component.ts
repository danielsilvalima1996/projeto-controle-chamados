import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoSelectOption, PoNotificationService } from '@po-ui/ng-components';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EmpresaService } from 'src/app/services/cadastros/empresa/empresa.service';
import { Empresa } from 'src/app/interfaces/empresa.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-empresa-edit',
  templateUrl: './empresa-edit.component.html',
  styleUrls: ['./empresa-edit.component.css']
})
export class EmpresaEditComponent implements OnInit {
  page: PoPageDefault = {
    title: 'Editar Empresa',
    actions: [
      { label: 'Salvar', action: () => { this.registrarEmpresa(this.editEmpresaForm.value) } },
      { label: 'Voltar', icon: 'po-icon po-icon-arrow-left', action: () => { (this.location.back()) } },
    ],
    breadcrumb: {
      items: [
        { label: 'Dashboard' },
        { label: 'Cadastros' },
        { label: 'Empresas' },
        { label: 'Editar Empresa' }
      ]
    }

  }

  constValue = {
    isDisabled: <boolean>true,
    id: ''
  }

  selects = {
    active: <PoSelectOption[]>[
      { label: 'ATIVO', value: 'true' },
      { label: 'INATIVO', value: 'false' }
    ]
  }

  editEmpresaForm: FormGroup = this.fb.group({
    id: [''],
    ativo: ['', [Validators.required]],
    cnpj: [''],
    nomeFantasia: ['',[Validators.required]],
    razaoSocial: ['',[Validators.required]],
    endereco: ['',[Validators.required]],
    codigoTotvs: [''],
    admin: ['',[Validators.required]],
    telefone: ['',[Validators.required,Validators.maxLength(10)]],
    celular: ['',[Validators.required, Validators.maxLength(11)]],
    criado: ['', []],
    modificado: ['', []],

  })

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private empresaService: EmpresaService,
    private notificationService: PoNotificationService,
  ) { }

  ngOnInit() {
    this.editEmpresaForm.valueChanges.subscribe((_) => {
      this.page.actions[0].disabled = this.editEmpresaForm.invalid
    })

    this.route.paramMap
      .subscribe((params: ParamMap) => {
        this.constValue.id = params.get('id')
      })
    this.findById(this.constValue.id)
  }

  get controls() {
    return this.editEmpresaForm.controls;
  }


  private findById(id) {
    this.empresaService
      .findById(id)
      .subscribe((data) => {
        data.criado = new Date(data.criado);
        data.modificado = new Date(data.modificado);
        this.editEmpresaForm.setValue(data);
        data.ativo == true ? this.controls.ativo.setValue('true') : this.controls.ativo.setValue('false');
      })
  }


  registrarEmpresa(empresa: Empresa) {
    if (this.editEmpresaForm.invalid) {
      this.notificationService.warning('Formulário Inválido!');
      return;
    } else {
      this.empresaService
        .createEmpresa(empresa)
        .subscribe((data) => {
          this.notificationService.success('Empresa atualizada com sucesso!');
          this.location.back();
        },
          (error: HttpErrorResponse) => {
            this.notificationService.error(error.error.meta.message);
          })
    }
  }

}
