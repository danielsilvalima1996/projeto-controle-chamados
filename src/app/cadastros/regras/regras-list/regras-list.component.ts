import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoBreadcrumb, PoBreadcrumbItem, PoTableColumn, PoNotificationService, PoSelectOption } from '@po-ui/ng-components';
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
    title: 'Regra',
    breadcrumb: <PoBreadcrumb>{
      items: <PoBreadcrumbItem[]>[
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Regra' }
      ]
    },
    actions: [
      { label: 'Adicionar', url: 'cadastros/regra/add' },
      { label: 'Editar', action: () => { this.editarRegras() } },
      { label: 'Visualizar', action: () => { this.viewRegras() } }
    ]
  }

  table = {
    columns: <PoTableColumn[]>[
      { property: 'id', label: 'Código', width: '10%' },
      { property: 'descricao', label: 'Descrição', width: '15%' },
      { property: 'criado', label: 'Criado', width: '10%', type: 'date', format: 'dd/MM/yyyy' },
      { property: 'modificado', label: 'Modificado', width: '15%', type: 'date', format: 'dd/MM/yyyy' },
      { property: 'criadoPor', label: 'Criado Por', width: '15%' },
      { property: 'modificadoPor', label: 'Modificado Por', width: '15%' },
      { property: 'ativo', label: 'Ativo', width: '10%', type: 'boolean' },
      { property: 'quantidadePagina', label: 'Qtd. Páginas', width: '10%' }
    ],
    items: [],
    height: 0,
    loading: false
  }

  public regraForm: FormGroup;

  selects = {
    ativoOptions: <Array<PoSelectOption>>[
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
    this.regraForm = this.fb.group({
      id: ['', []],
      descricao: ['', []],
      ativo: ['']
    })
    this.getRegras();
  }

  get controls() {
    return this.regraForm.controls;
  }

  getSelected(event) {
    this.itemSelecionado = event.id
  }

  getUnSelected() {
    this.itemSelecionado = ''
  }

  getRegras() {
    this.loading = true;
    this.regrasService.findAll(
      this.utilService.getParameters(
        this.regraForm.value
      ))
      .subscribe((data) => {
        data.forEach(item => item.quantidadePagina = item.idPagina.length);
        this.table.items = data;
        this.loading = false;
      },
        (error: HttpErrorResponse) => {
          console.log(error.message);
          this.table.items = [];
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
