import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoTableColumn, PoSelectOption } from '@portinari/portinari-ui';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilService } from 'src/app/services/utils/util-service/util.service';
import { PermissionsService } from 'src/app/services/cadastros/permissions/permissions.service';

@Component({
  selector: 'app-permissions-list',
  templateUrl: './permissions-list.component.html',
  styleUrls: ['./permissions-list.component.css']
})
export class PermissionsListComponent implements OnInit {

  page: PoPageDefault = {

    title: ' Cadastro de Permissões',
    breadcrumb:
    {
      items: [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Permissões' }
      ]
    },
    actions: [
      { label: 'Nova', url: 'permission/add' },
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
      { property: 'description', label: 'Descrição', width: '20%' },
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
      { label: 'ID', value: 'id' },
      { label: 'NOME', value: 'description' },
      { label: 'ATIVO', value: 'active' }
    ],
    filtro: <PoSelectOption[]>[
      { label: 'SIM', value: 'true' },
      { label: 'NÃO', value: 'false' }
    ]
  }

  permissionForm: FormGroup = this.fb.group({
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
    private permissionService: PermissionsService,
    private router: Router,
    private route: ActivatedRoute,
    private utilService: UtilService
  ) { }

  ngOnInit() {
    this.controls.pesquisa
      .valueChanges.subscribe((data) => {
        this.tipoForm(data);
      })
    this.getPermission(this.permissionForm.value);
  }

  get controls() {
    return this.permissionForm.controls;
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

  getPermission(form?) {
    this.table.loading = true;
    this.permissionService.findAll(this.utilService.getParameters(form))
      .subscribe((data) => {
        this.table.items = data.content;
        this.table.loading = false;
      })

  }

  getSelected(event) {
    this.constValue.selecionado = event.id;
  }

  getUnSelected() {
    this.constValue.selecionado = '';
  }
}