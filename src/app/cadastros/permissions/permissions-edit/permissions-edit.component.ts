import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoSelectOption, PoNotificationService } from '@portinari/portinari-ui';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { PermissionsService } from 'src/app/services/cadastros/permissions/permissions.service';
import { Permission } from 'src/app/interfaces/permission.model';

@Component({
  selector: 'app-permissions-edit',
  templateUrl: './permissions-edit.component.html',
  styleUrls: ['./permissions-edit.component.css']
})
export class PermissionsEditComponent implements OnInit {

  page: PoPageDefault = {

    title: 'Editar Permissões',
    actions: [
      { label: 'Salvar', disabled: true, action: () => { this.savePermission(this.permissionEditForm.value) } },
      { label: 'Voltar', icon: 'po-icon po-icon-arrow-left', action: () => { (this.location.back()) } },
    ],
    breadcrumb: {
      items: [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Permissões' },
        { label: 'Editar Permissões' }
      ]
    }

  }

  selects = {
    active: <PoSelectOption[]>[
      { label: 'ATIVA', value: 'true' },
      { label: 'INATIVA', value: 'false' }
    ]
  }

  permissionEditForm: FormGroup = this.fb.group({
    id: ['', []],
    description: ['', [Validators.required]],
    active: ['', [Validators.required]],
    created: ['', []],
    modified: ['', []],
    page: ['', []],
    authority:['']
  })

  constValue = {
    id: ''
  }


  constructor(
    private location: Location,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private permissionService: PermissionsService,
    private notificationService: PoNotificationService
  ) { }

  ngOnInit() {
    this.permissionEditForm.valueChanges.subscribe((_) => {
      this.page.actions[0].disabled = this.permissionEditForm.invalid;
    })

    this.route.paramMap
      .subscribe((params: ParamMap) => {
        this.constValue.id = params.get('id');
      })
    this.findById(this.constValue.id);
  }

  get controls() {
    return this.permissionEditForm.controls;
  }

  private findById(id) {
    this.permissionService
      .findById(id)
      .subscribe((data) => {
        data.created = new Date(data.created);
        data.modified = new Date(data.modified);
        this.permissionEditForm.setValue(data);
        data.active == true ? this.controls.active.setValue('true') : this.controls.active.setValue('false');
      })
  }

  private savePermission(permission: Permission) {
    this.permissionService
      .alterPermission(permission)
      .subscribe((data) => {
        this.notificationService.success('Permissão alterada com sucesso!');
        this.location.back();
      },
        (error: any) => {
          this.notificationService.error('Erro ao salvar permissão!');
        })
  }

}

