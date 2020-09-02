import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoBreadcrumb, PoBreadcrumbItem, PoDialogService, PoNotificationService } from '@po-ui/ng-components';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { RegrasService } from 'src/app/services/cadastros/regras/regras.service';
import { Regras } from 'src/app/interfaces/regra.model';

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

  regrasForm: FormGroup = this.fb.group({
    id: ['', []],
    descricao: ['', [Validators.required]],
    ativo: [, []],
    criado:['',[]],
    modificado:['',[]],
    criadoPor:['',[]],
    modificadoPor:['',[]]
  })

  public disabledId: boolean = false;
  public disabledFields: boolean = false;
  private id: string = '';
  public loading: boolean;

  public tipoTela: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: PoDialogService,
    private route: ActivatedRoute,
    private regrasService: RegrasService,
    private notificationService: PoNotificationService
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
          { label: 'Salvar', disabled: true, action: () => { this.cadastrarRegra(this.regrasForm.value) } },
          { label: 'Cancelar', action: () => { this.dialogVoltar() } }
        ];
      this.regrasForm.valueChanges
        .subscribe((_) => {
          this.page.actions[0].disabled = this.regrasForm.invalid;
        });
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
          { label: 'Salvar', disabled: true, action: () => { this.alterRegras(this.regrasForm.value) } },
          { label: 'Cancelar', action: () => { this.dialogVoltar() } }
        ];

      this.route.paramMap
        .subscribe((paramMap: ParamMap) => {
          this.id = paramMap.get('id');
        })
      this.getDetailById(this.id);
      this.regrasForm.valueChanges
        .subscribe((_) => {
          this.page.actions[0].disabled = this.regrasForm.invalid;
        });
    } else {
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
          { label: 'Cancelar', action: () => this.router.navigate(['cadastros/regras/']) }
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
        this.regrasForm.setValue(data);
        this.loading = false;
      },
        (error: HttpErrorResponse) => {
          this.notificationService.error(`Regra ${id} não encontrada`);
          this.router.navigate(['cadastros/regras/'])
          this.loading = false;
        })
  }

  alterRegras(regra: Regras) {
    this.loading = true;
    if (this.regrasForm.invalid) {
      this.notificationService.warning('Formulário Inválido!');
      this.loading = false;
      return;
    } else {
      this.regrasService
        .alterRegras(regra)
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

  cadastrarRegra(regra: Regras) {
    this.loading = true;
    if (this.regrasForm.invalid) {
      this.notificationService.warning('Formulário Inválido!');
      this.loading = false;
      return;
    } else {
      this.regrasService
        .createRegras(regra)
        .subscribe((data) => {
          this.notificationService.success('Regra cadastrada com sucesso!');
          this.router.navigate(['cadastros/regras/']);
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
      confirm: () => this.router.navigate(['cadastros/regras/']),
      title: 'Alerta',
      message: 'Salve para não perder os dados. Deseja voltar a tela de listagem?'
    })
  }

}