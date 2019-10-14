import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoSelectOption } from '@portinari/portinari-ui';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RolesService } from 'src/app/services/cadastros/roles/roles.service';
import { UtilService } from 'src/app/services/utils/util-service/util.service';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.css']
})
export class RoleEditComponent implements OnInit {

  page: PoPageDefault = {

    title: 'Editar Regras',
    actions: [
      { label: 'Salvar', disabled: true, action: () => { } },
      { label: 'Voltar', icon: 'po-icon po-icon-arrow-left', action: () => { (this.location.back()) } },
    ],
    breadcrumb:
    {
      items: [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Regras' },
        { label: 'Editar Regras' }
      ]
    }

  }

  selects = {
    statusOptions: [
      { label: 'ATIVO', value: true },
      { label: 'INATIVO', value: false }
    ]
  }

  roleEditForm: FormGroup = this.fb.group({
    id: [''],
    name: ['', [Validators.required]],
    active: ['', [Validators.required]],
    created: ['', []],
    modified: ['', []],
    page: ['', []]
  })

  constValue = {
    action: '',
    id: ''
  }


  constructor(
    private location: Location,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private roleService: RolesService,
    private utilService: UtilService
  ) { }

  ngOnInit() {
    this.roleEditForm.valueChanges.subscribe((_) => {
      this.page.actions[0].disabled = this.roleEditForm.invalid;
    })

    this.route.paramMap
      .subscribe((params: ParamMap) => {
        this.constValue.action = params.get('action');
        this.constValue.id = params.get('id');

      })
      this.findById(this.constValue.id);
  }

  get controls() {
    return this.roleEditForm.controls;
  }

  private findById(id) {
    this.roleService
      .findById(id)
      .subscribe((data) => {
        let obj: Object = data;
        
        this.roleEditForm.setValue({}, obj);
      })
  }

}
