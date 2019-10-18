import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { PoPageDefault, PoSelectOption, PoNotificationService } from '@portinari/portinari-ui';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EmpresaService } from 'src/app/services/cadastros/empresa/empresa.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Empresa } from 'src/app/interfaces/empresa.model';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {

  page: PoPageDefault = {
    title: 'Editar Empresa',
    actions: [
      { label: 'Salvar', action: () => { } },
      { label: 'Voltar', icon: 'po-icon po-icon-arrow-left', action: () => { (this.location.back()) } },
    ],
    breadcrumb: {
      items: [
        { label: 'Home' },
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
      { label: 'ATIVO', value: 'true ' },
      { label: 'INATIVO', value: 'false' }
    ]
  }

  editEmpresaForm: FormGroup = this.fb.group({
    id: [''],
    ativo: ['', [Validators.required]],
    cnpj: [''],
    nomeFantasia: [''],
    razaoSocial: [''],
    endereco: [''],
    codigoTotvs: [''],
    admin: [''],
    telefone: [''],
    celular: [''],
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
    console.log(this.constValue.id);


  }

  get controls() {
    return this.editEmpresaForm.controls;
  }


  private findById(id) {
    this.empresaService
      .findById(id)
      .subscribe((data) => {
        console.log(data);

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
