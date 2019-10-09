import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { PoPageAction, PoBreadcrumbItem, PoBreadcrumb, PoNotificationService } from '@portinari/portinari-ui';
import { RolesService } from 'src/app/services/cadastros/roles/roles.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html',
  styleUrls: ['./role-add.component.css']
})
export class RoleAddComponent implements OnInit {

  page = {
    actions: <PoPageAction[]>[
      { label: 'Salvar', disabled:true, action: () => { this.addRole() } },
      { label: 'Cancelar', action: () => { this.location.back() } },
    ],

    title: 'Cadastro de Regra',
    breadcrumb: <PoBreadcrumb>{
      items: <PoBreadcrumbItem[]>[
        { label: 'Home' },
        { label: 'Configurações' },
        { label: 'Regras' },
        { label: 'Adicionar Regra' },
      ]
    },
    statusOptions: [
      { label: 'ATIVA', value: true },
      { label: 'INATIVA', value: false }
    ]
  }

  roleaddForm: FormGroup = this.fb.group({
    nomeRegra: ['', [Validators.required,Validators.minLength(7), Validators.pattern('^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$')]],
    status: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private roleService: RolesService,
    private notificationService: PoNotificationService
  ) { }

  ngOnInit() {
    this.roleaddForm.valueChanges.subscribe((_) => {
      this.page.actions[0].disabled = this.roleaddForm.invalid;
    })
  }

   addRole() {
    this.roleService.addRoles(this.roleaddForm.value)
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
