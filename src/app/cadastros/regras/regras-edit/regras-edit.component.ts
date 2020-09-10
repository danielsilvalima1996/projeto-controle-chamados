import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PoBreadcrumb, PoBreadcrumbItem, PoDialogService, PoNotificationService, PoPageDefault, PoTableColumn } from '@po-ui/ng-components';
import { Pagina } from 'src/app/interfaces/pagina.model';
import { RegrasService } from 'src/app/services/cadastros/regras/regras.service';
import { Regra } from 'src/app/interfaces/regra.model';
import { PaginaService } from 'src/app/services/cadastros/pagina/pagina.service';

@Component({
  selector: 'app-regras-edit',
  templateUrl: './regras-edit.component.html',
  styleUrls: ['./regras-edit.component.css']
})
export class RegrasEditComponent implements OnInit {

  public page: PoPageDefault = {
    title: '',
    breadcrumb: <PoBreadcrumb>{
      items: <PoBreadcrumbItem[]>[]
    },
    actions: []
  }

  regraForm: FormGroup = this.fb.group({
    id: ['', []],
    descricao: ['', [Validators.required]],
    ativo: [, []],
    criado: ['', []],
    modificado: ['', []],
    criadoPor: ['', []],
    modificadoPor: ['', []]
  })

  public disabledId: boolean = false;
  public disabledFields: boolean = false;
  private id: string = '';
  public loading: boolean;

  public tipoTela: string;

  private paginasSelecionadas: Array<Pagina> = [];

  public table = {
    columns: <Array<PoTableColumn>>[
      { property: 'id', label: 'id', width: '20%' },
      { property: 'link', label: 'link', width: '40%' },
      { property: 'label', label: 'label', width: '40%' }
    ],
    items: <Array<Pagina>>[],
    selectable: <boolean>true
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: PoDialogService,
    private route: ActivatedRoute,
    private regrasService: RegrasService,
    private notificationService: PoNotificationService,
    private paginaService: PaginaService
  ) { }

  ngOnInit(): void {
    if (this.router.url.indexOf('add') != -1) {
      this.tipoTela = 'add';
      this.page.title = 'Adicionar Regra';
      this.disabledId = true;
      this.page.breadcrumb.items = [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Regras' },
        { label: 'Adicionar Regra' }
      ],
        this.page.actions = [
          { label: 'Salvar', disabled: true, action: () => { this.cadastrarRegra(this.regraForm.value) } },
          { label: 'Cancelar', action: () => { this.dialogVoltar() } }
        ];
      this.regraForm.valueChanges
        .subscribe((_) => {
          this.page.actions[0].disabled = this.regraForm.invalid;
        });
      this.findAllPagina();
    } else if (this.router.url.indexOf('edit') != -1) {
      this.tipoTela = 'edit';
      this.page.title = 'Editar Regra';
      this.disabledId = true;
      this.page.breadcrumb.items = [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Regras' },
        { label: 'Editar Regra' }
      ],
        this.page.actions = [
          { label: 'Salvar', disabled: true, action: () => { this.alterRegra(this.regraForm.value) } },
          { label: 'Cancelar', action: () => { this.dialogVoltar() } }
        ];

      this.route.paramMap
        .subscribe((paramMap: ParamMap) => {
          this.id = paramMap.get('id');
        })
      this.getDetailById(this.id);
      this.regraForm.valueChanges
        .subscribe((_) => {
          this.page.actions[0].disabled = this.regraForm.invalid;
        });
    } else {
      this.table.selectable = false;
      this.tipoTela = 'view';
      this.page.title = 'Visualizar Regra';
      this.disabledId = true;
      this.disabledFields = true;
      this.page.breadcrumb.items = [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Regra' },
        { label: 'Visualizar Regra' }
      ],
        this.page.actions = [
          { label: 'Salvar', disabled: true },
          { label: 'Cancelar', action: () => this.router.navigate(['cadastros/regra/']) }
        ];
      this.route.paramMap
        .subscribe((paramMap: ParamMap) => {
          this.id = paramMap.get('id');
        })
      this.getDetailById(this.id);
    }
  }

  getDetailById(id) {
    this.loading = true;
    this.regrasService
      .findById(id)
      .subscribe((data) => {
        data.criado = new Date(data.criado);
        data.modificado = new Date(data.modificado);
        data.idPagina.forEach((item) => {
          this.selectTable(item);
        });
        this.paginasSelecionadas = data.idPagina;
        if (this.tipoTela != 'view') {
          this.findAllPagina();
        } else {
          this.paginasSelecionadas.map((item) => {
            if (item.parent != 0) {
              let pai = this.paginasSelecionadas.find(pai => pai.id == item.id);
              item.link = pai.link + item.link;
            }
          })
          this.table.items = this.paginasSelecionadas;
        }
        delete data.idPagina;
        this.regraForm.setValue(data);
        this.loading = false;
      },
        (error: HttpErrorResponse) => {
          this.notificationService.error(`Regra ${id} não encontrada`);
          this.router.navigate(['cadastros/regra/'])
          this.loading = false;
        })
  }

  private findAllPagina() {
    this.paginaService.
      findAllPagina()
      .subscribe((data) => {
        data.forEach((item => {
          if (item.parent != 0) {
            let pai = data.find(parent => parent.id == item.parent)
            item.link = `${pai.link}${item.link}`
          }
        }))
        this.table.items = data;
      },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        })
  }

  alterRegra(regra: Regra) {
    regra.idPagina = this.paginasSelecionadas;
    this.loading = true;
    if (this.regraForm.invalid) {
      this.notificationService.warning('Formulário Inválido!');
      this.loading = false;
      return;
    } else {
      this.regrasService
        .alterRegra(regra)
        .subscribe((data) => {
          this.notificationService.success('Regra alterada com sucesso!');
          this.router.navigate(['cadastros/regras/']);
          this.loading = false;
        },
          (error: HttpErrorResponse) => {
            console.error(error['message'])
            this.loading = false;
          })
    }
  }

  cadastrarRegra(regra: Regra) {
    regra.idPagina = this.paginasSelecionadas;
    this.loading = true;
    if (this.regraForm.invalid) {
      this.notificationService.warning('Formulário Inválido!');
      this.loading = false;
      return;
    } else {
      this.regrasService
        .createRegra(regra)
        .subscribe((data) => {
          this.notificationService.success('Regra cadastrada com sucesso!');
          this.router.navigate(['cadastros/regra/view', data.id]);
          this.loading = false;
        },
          (error: HttpErrorResponse) => {
            console.error(error['message'])
            this.loading = false;
          })
    }
  }

  private dialogVoltar() {
    this.dialog.confirm({
      confirm: () => this.router.navigate(['cadastros/regra/']),
      title: 'Alerta',
      message: 'Salve para não perder os dados. Deseja voltar a tela de listagem?'
    })
  }

  public selectTable(pagina: Pagina) {
    let duplicata = this.paginasSelecionadas.find(item => item == pagina);
    if (!duplicata) {
      this.paginasSelecionadas.push(pagina);
    }
    console.log(this.paginasSelecionadas);
  }

  public unSelectTable(pagina: Pagina) {
    this.paginasSelecionadas = this.paginasSelecionadas.filter(item => item != pagina);
  }

  public allSelectTable() {
    this.paginasSelecionadas = this.table.items;
  }

  public unAllSelectTable() {
    this.paginasSelecionadas = [];
  }

}