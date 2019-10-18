import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { PoPageAction, PoBreadcrumbItem, PoBreadcrumb, PoNotificationService, PoPageDefault, PoSelectOption } from '@portinari/portinari-ui';
import { RolesService } from 'src/app/services/cadastros/roles/roles.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html',
  styleUrls: ['./role-add.component.css']
})
export class RoleAddComponent implements OnInit {

  page: PoPageDefault = {
    actions: <PoPageAction[]>[
      { label: 'Salvar', disabled: true, action: () => { this.addRole() } },
      { label: 'Cancelar', action: () => { this.location.back() } },
    ],

    title: 'Cadastro de Regra',
    breadcrumb: <PoBreadcrumb>{
      items: <PoBreadcrumbItem[]>[
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Regras' },
        { label: 'Adicionar Regra' },
      ]
    },
  }

  selects = {
    statusOptions: <PoSelectOption[]> [
      { label: 'ATIVA', value: 'true' },
      { label: 'INATIVA', value: 'false' }
    ]
  }

  roleAddForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(5),
    Validators.pattern('^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$')]],
    active: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private roleService: RolesService,
    private notificationService: PoNotificationService
  ) { }

  ngOnInit() {
    this.roleAddForm.valueChanges.subscribe((_) => {
      this.page.actions[0].disabled = this.roleAddForm.invalid;
    })
  }

  addRole() {
    if (this.roleAddForm.invalid) {
      this.notificationService.warning('Formulário Inválido!');
      return;
    }
    else {
      this.roleService
        .createRole(this.roleAddForm.value)
        .subscribe((data) => {
          this.notificationService.success('Regra Salva com Sucesso');
          this.location.back();
        },
          (error: HttpErrorResponse) => {
            this.notificationService.error(error.error.meta.message);
          }
        );
    }
  }

}
