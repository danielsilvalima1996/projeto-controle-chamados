import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoTableColumn, PoSelectOption, PoTableAction } from '@portinari/portinari-ui';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RolesListService } from 'src/app/services/cadastros/roles/roles-list.service';
import { Router, ActivatedRoute } from '@angular/router';

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
      { label: 'Nova', url: 'role-list/add' },
      { label: 'Editar', url: 'role-list/edit:id' },
      // {
      //   label: 'Editar', action: () => {
      //     this.router.navigate(['edit', this.constValue.selecionado],{relativeTo:this.route});
      //   }
      // }
      ],
  }

  table = {
    columns: <PoTableColumn[]>[
      { property: 'id', label: 'ID', width: '10%' },
      { property: 'nomeRegra', label: 'Nome da Regra', width: '20%' },
      { property: 'ativo', label: 'Status', width: '20%' },
      { property: 'created', label: 'Criado', width: '20%' },
      { property: 'modified', label: 'Modificado', width: '20%' }
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

  constValue = {
    selecionado:''
  }

  constructor(
    private fb: FormBuilder,
    private roleService: RolesListService,
    private router: Router,
    private route: ActivatedRoute
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

  getSelected(event) {
    this.constValue.selecionado = event.id;
    console.log(event.id)
    
  }
}
