import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoTableColumn, PoSelectOption, PoTableAction } from '@portinari/portinari-ui';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RolesListService } from 'src/app/services/roles/roles-list.service';

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
        { label: 'Configurações' },
        { label: 'Regras' }
      ]
    },
    actions: [
      { label: 'Nova', url: 'role-list/add' }
    ]

  }

  table = {
    columns: <PoTableColumn[]>[
      { property: 'id', label: 'ID', width: '10%' },
      { property: 'idEmpresa', label: 'ID Empresa', width: '10%' },
      { property: 'nomeRegra', label: 'Nome da Regra', width: '20%' },
      { property: 'ativo', label: 'Status', width: '20%' },
      { property: 'created', label: 'Criado', width: '20%' },
      { property: 'modified', label: 'Modificado', width: '20%' }
    ],
    actions: <PoTableAction[]>[
      { label: 'Visualizar', url: 'role-list/view:id' },
      { label: 'Editar', url: 'role-list/edit:id' },
    ],
    items: [],
    height: 0,
    loading: false
  }

  roleForm: FormGroup = this.fb.group({
    filtro:[''],
    pesquisa:['']
  })

  selects = {
    pesquisa: <PoSelectOption[]>[
      { label: 'ID', value:'id'},
      { label: 'ID EMPRESA', value:'idEmpresa'},
      { label: 'STATUS', value: 'ativo'}
    ]
  }

  constructor(
    private fb: FormBuilder,
    private roleService: RolesListService
  ) { }

  ngOnInit() {
    this.getRoles()
  }

  private getRoles(){
    this.roleService.getRoles()
    .subscribe((data:any) => {
      this.table.items = data
    })
  
  }
}
