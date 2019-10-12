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

    title: ' Cadastro de Regras',
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

  selects = {
    pesquisa: <PoSelectOption[]>[
      { label: 'Id', value: 'id' },
      { label: 'Nome', value: 'name' },
      { label: 'Ativo', value: 'active' }
    ],
    filtro: <PoSelectOption[]>[
      { label: 'SIM', value: 'true' },
      { label: 'NÃO', value: 'false' }
    ]
  }

  roleForm: FormGroup = this.fb.group({
    pesquisa: ['', []],
    filtro: ['', []]
  })

  constValue = {
    selecionado: '',
    input: <Boolean>true,
    select: <Boolean>false
  }

  constructor(
    private fb: FormBuilder,
    private roleService: RolesService,
    private router: Router,
    private route: ActivatedRoute,
    private utilService: UtilService
  ) { }

  ngOnInit() {
    this.controls.pesquisa
      .valueChanges.subscribe((data) => {
        this.tipoForm(data);
      })
    this.getRoles(this.roleForm.value);
  }

  get controls() {
    return this.roleForm.controls;
  }

  tipoForm(tipo) {
    if (tipo == 'active') {
      this.constValue.input = false;
      this.constValue.select = true;
    } else {
      this.constValue.input = true;
      this.constValue.select = false;
    }
  }

  getRoles(form?) {
    this.roleService.getRoles(this.utilService.getParameters(form))
      .subscribe((data: any) => {
        this.table.items = data;
      })

  }

  getSelected(event) {
    this.constValue.selecionado = event.id;
  }

  getUnSelected() {
    this.constValue.selecionado = '';
  }
}
