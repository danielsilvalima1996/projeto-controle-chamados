import { Component, OnInit } from '@angular/core';
import { TecnicosService } from 'src/app/services/cadastros/tecnicos/tecnicos.service';
import { PoPageDefault, PoBreadcrumb, PoBreadcrumbItem, PoTableColumn, PoSelectOption, PoNotificationService } from '@po-ui/ng-components';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilService } from 'src/app/services/utils/util-service/util.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/services/cadastros/users/user.service';

@Component({
  selector: 'app-tecnicos-list',
  templateUrl: './tecnicos-list.component.html',
  styleUrls: ['./tecnicos-list.component.css']
})
export class TecnicosListComponent implements OnInit {

  public page: PoPageDefault = {
    title: 'Técnico',
    breadcrumb: <PoBreadcrumb>{
      items: <PoBreadcrumbItem[]>[
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Técnico' }
      ]
    },
    actions: [
      { label: 'Adicionar', url: 'cadastros/tecnico/add' },
      { label: 'Editar', action: () => { this.editarTecnicos() } },
      { label: 'Visualizar', action: () => { this.viewTecnicos() } }
    ]
  }

  table = {
    columns: <PoTableColumn[]>[
      { property: 'id', label: 'Código', width: '10%' },
      { property: 'idUsuario', label: 'Usuário', width: '20%' },
      { property: 'criado', label: 'Criado', width: '10%', type: 'date', format: 'dd/MM/yyyy' },
      { property: 'modificado', label: 'Modificado', width: '15%', type: 'date', format: 'dd/MM/yyyy' },
      { property: 'criadoPor', label: 'Criado Por', width: '15%' },
      { property: 'modificadoPor', label: 'Modificado Por', width: '15%' },
      { property: 'ativo', label: 'Ativo', width: '15%', type: 'boolean' }
    ],
    items: [],
    height: 0,
    loading: false
  }

  tecnicosForm: FormGroup = this.fb.group({
    id: ['', []],
    idUsuario: ['', []],
    ativo: ['']
  })

  selects = {
    ativoOptions: <Array<PoSelectOption>>[
      { label: 'Ativo', value: true },
      { label: 'Inativo', value: false },
      { label: 'Todos', value: '' }
    ],
    usuarios:<Array<PoSelectOption>>[

    ]
  }

  private itemSelecionado: string = '';
  public loading: boolean;

  constructor(
    private notificationService: PoNotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private tecnicosService: TecnicosService,
    private fb: FormBuilder,
    private utilService: UtilService,
    private usuariosService: UserService
  ) { }

  ngOnInit(): void {
    this.getTecnicos();
    this.retornaUsuarios();
  }

  get controls() {
    return this.tecnicosForm.controls;
  }

  getSelected(event) {
    this.itemSelecionado = event.id
  }

  getUnSelected() {
    this.itemSelecionado = ''
  }

  getTecnicos() {
    this.loading = true;
    let obj = {
      id: this.controls.id.value,
      idUsuario: this.controls.idUsuario.value,
      ativo: this.controls.ativo.value
    }
    this.tecnicosService.
      getTecnico(this.utilService.getParameters(obj))
      .subscribe((data: any) => {
        let arr: Array<any> = data
          .map((item) => {
            let obj = {};
            Object.keys(item).map((data) => {
              if (item[data] == '' || item[data] == null) {
                obj[data] = '-';
              } else if (data == 'idUsuario') {
                obj[data] = item[data].nomeCompleto;
              } else {
                obj[data] = item[data];
              }

            })
            return obj;
          })
        this.table.items = arr;
        this.loading = false;
      },
        (error: HttpErrorResponse) => {
          console.log(error.message);
          this.table.items = [];
          this.loading = false;
        })
  };

  private retornaUsuarios() {
    this.usuariosService
      .getUser("ativo=true")
      .subscribe((data: any) => {
        let arr = data.map((item) => {
          return <PoSelectOption>{ label: `${item.nomeCompleto }`, value: item.id }
        })
        this.selects.usuarios = this.utilService.sortListas(arr);
      })
  }

  private editarTecnicos() {
    if (this.itemSelecionado == null || this.itemSelecionado == '') {
      this.notificationService.warning('Selecione um técnico para editar!');
      return;
    } else {
      this.router.navigate(['edit', this.itemSelecionado], { relativeTo: this.route });
    }
  }

  private viewTecnicos() {
    if (this.itemSelecionado == null || this.itemSelecionado == '') {
      this.notificationService.warning('Selecione um técnico para visualizar!');
      return;
    } else {
      this.router.navigate(['view', this.itemSelecionado], { relativeTo: this.route });
    }
  }

}

