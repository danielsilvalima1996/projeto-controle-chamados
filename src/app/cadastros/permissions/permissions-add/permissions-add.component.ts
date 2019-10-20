import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoPageAction, PoBreadcrumb, PoBreadcrumbItem, PoSelectOption, PoNotificationService } from '@portinari/portinari-ui';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { PermissionsService } from 'src/app/services/cadastros/permissions/permissions.service';

@Component({
  selector: 'app-permissions-add',
  templateUrl: './permissions-add.component.html',
  styleUrls: ['./permissions-add.component.css']
})
export class PermissionsAddComponent implements OnInit {
  
  page: PoPageDefault = {
    actions: <PoPageAction[]>[
      { label: 'Salvar', disabled: true, action: () => { this.addPermission() } },
      { label: 'Cancelar', action: () => { this.location.back() } },
    ],

    title: 'Adicionar Permissões',
    breadcrumb: <PoBreadcrumb>{
      items: <PoBreadcrumbItem[]>[
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Permissões' },
        { label: 'Adicionar Permissões' },
      ]
    },
  }

  selects = {
    statusOptions: <PoSelectOption[]>[
      { label: 'ATIVO', value: 'true' },
      { label: 'INATIVO', value: 'false' }
    ]
  }

  permissionAddForm: FormGroup = this.fb.group({
    description: ['', [Validators.required, Validators.minLength(5),
    Validators.pattern('^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$')]],
    active: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private permissionService: PermissionsService,
    private notificationService: PoNotificationService
  ) { }

  ngOnInit() {
    this.permissionAddForm.valueChanges.subscribe((_) => {
      this.page.actions[0].disabled = this.permissionAddForm.invalid;
    })
  }

  addPermission() {
    if (this.permissionAddForm.invalid) {
      this.notificationService.warning('Formulário Inválido!');
      return;
    }
    else {
      this.permissionService
        .createPermission(this.permissionAddForm.value)
        .subscribe((data) => {
          this.notificationService.success('Permissão Salva com Sucesso');
          this.location.back();
        },
          (error: HttpErrorResponse) => {
            this.notificationService.error(error.error.meta.message);
          }
        );
    }
  }

}
