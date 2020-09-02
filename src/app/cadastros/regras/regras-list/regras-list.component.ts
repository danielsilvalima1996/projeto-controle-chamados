import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoBreadcrumb, PoBreadcrumbItem, PoTableColumn, PoNotificationService } from '@po-ui/ng-components';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RegrasService } from 'src/app/services/cadastros/regras/regras.service';
import { UtilService } from 'src/app/services/utils/util-service/util.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-regras-list',
  templateUrl: './regras-list.component.html',
  styleUrls: ['./regras-list.component.css']
})
export class RegrasListComponent implements OnInit {

  public page: PoPageDefault = {
    title: 'Regras',
    breadcrumb: <PoBreadcrumb>{
      items: <PoBreadcrumbItem[]>[
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Regras' }
      ]
    },
    actions: [
      { label: 'Adicionar', url: 'cadastros/regras/add' },
      { label: 'Editar', action: () => { this.editarRegras() } },
      { label: 'Visualizar', action: () => { this.viewRegras() } }
    ]
  }

  table = {
    columns: <PoTableColumn[]>[
      { property: 'id', label: 'Código', width: '10%' },
      { property: 'descricao', label: 'Descrição', width: '20%' },
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

  regrasForm: FormGroup = this.fb.group({
    id: ['', []],
    descricao: ['', []],
    ativo: ['']
  })

  selects = {
    ativoOptions: <Array<any>>[
      { label: 'Ativo', value: true },
      { label: 'Inativo', value: false },
      { label: 'Todos', value: '' }
    ]
  }

  private itemSelecionado: string = '';
  public loading: boolean;

  constructor(
    private notificationService: PoNotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private regrasService: RegrasService,
    private fb: FormBuilder,
    private utilService: UtilService
  ) { }

  ngOnInit(): void {
    this.getRegras();
  }

  get controls() {
    return this.regrasForm.controls;
  }

  getSelected(event) {
    this.itemSelecionado = event.id
  }

  getUnSelected() {
    this.itemSelecionado = ''
  }

  getRegras() {
    this.loading = true;
    let obj = {
      id: this.controls.id.value,
      descricao: this.controls.descricao.value,
      ativo: this.controls.ativo.value
    }
    this.regrasService.findAll(this.utilService.getParameters(obj))
      .subscribe((data) => {
        this.table.items = data;
        this.loading = false;
      },
        (error: HttpErrorResponse) => {
          console.log(error.error);
          this.loading = false;
        })
  }

  private editarRegras() {
    if (this.itemSelecionado == null || this.itemSelecionado == '') {
      this.notificationService.warning('Selecione uma regra para editar!');
      return;
    } else {
      this.router.navigate(['edit', this.itemSelecionado], { relativeTo: this.route });
    }
  }

  private viewRegras() {
    if (this.itemSelecionado == null || this.itemSelecionado == '') {
      this.notificationService.warning('Selecione uma regra para visualizar!');
      return;
    } else {
      this.router.navigate(['view', this.itemSelecionado], { relativeTo: this.route });
    }
  }

}
