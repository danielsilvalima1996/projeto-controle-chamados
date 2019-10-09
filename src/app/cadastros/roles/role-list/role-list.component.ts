import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoTableColumn, PoSelectOption, PoTableAction } from '@portinari/portinari-ui';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RolesService } from 'src/app/services/cadastros/roles/roles.service';
import { UtilService } from 'src/app/services/utils/util-service/util.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  page: PoPageDefault = {

    title: 'Regras',
    breadcrumb:
    {
      items: [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Regras' }
      ]
    },
    actions: [
      { label: 'Nova', url: 'role-list/add' },
      {
        label: 'Editar', action: () => {
          this.router.navigate(['edit', this.constValue.selecionado], { relativeTo: this.route });
        }
      }
    ],
  }

  table = {
    columns: <PoTableColumn[]>[
      { property: 'id', label: 'ID', width: '10%' },
      { property: 'name', label: 'Nome da Regra', width: '20%' },
      { property: 'active', label: 'Ativo', width: '20%', type: 'boolean' },
      { property: 'created', label: 'Criado', width: '20%', type: 'date', format: 'dd/MM/yyyy' },
      { property: 'modified', label: 'Modificado', width: '20%', type: 'date', format: 'dd/MM/yyyy' }
    ],
    items: [],
    height: 0,
    loading: false
  }

  roleForm: FormGroup = this.fb.group({
    id: [''],
    name: ['']
  })

  constValue = {
    selecionado: ''
  }

  constructor(
    private fb: FormBuilder,
    private roleService: RolesService,
    private router: Router,
    private route: ActivatedRoute,
    private utilService: UtilService
  ) { }

  ngOnInit() {
    this.getRoles(this.roleForm.value)
  }

  getRoles(form?) {
    console.log(form);
    this.roleService.getRoles(this.utilService.getParameters(form))
      .subscribe((data: any) => {
        this.table.items = data
      })

  }

  getSelected(event) {
    this.constValue.selecionado = event.id;
    console.log(event.id)
  }

  getUnSelected() {
    this.constValue.selecionado = '';
  }





}
