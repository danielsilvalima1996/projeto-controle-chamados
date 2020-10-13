import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoBreadcrumb, PoBreadcrumbItem, PoDialogService, PoNotificationService, PoSelectOption } from '@po-ui/ng-components';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/cadastros/users/user.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Tecnico } from 'src/app/interfaces/tecnico.model';
import { TecnicosService } from 'src/app/services/cadastros/tecnicos/tecnicos.service';

@Component({
  selector: 'app-tecnicos-edit',
  templateUrl: './tecnicos-edit.component.html',
  styleUrls: ['./tecnicos-edit.component.css']
})
export class TecnicosEditComponent implements OnInit {

  public page: PoPageDefault = {
    title: '',
    breadcrumb: <PoBreadcrumb>{
      items: <PoBreadcrumbItem[]>[]
    },
    actions: []
  }

  tecnicosForm: FormGroup = this.fb.group({
    id: ['', []],
    idUsuario: ['', []],
    ativo: [, []],
    criado: ['', []],
    modificado: ['', []],
    criadoPor: ['', []],
    modificadoPor: ['', []]
  });

  selects = {
    usuarios: <Array<PoSelectOption>>[]
  }

  public disabledId: boolean = false;
  public disabledFields: boolean = false;
  public disabledEdit: boolean = false;
  private id: string = '';
  public loading: boolean;

  public tipoTela: string;
  private tecnico: Tecnico;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: PoDialogService,
    private route: ActivatedRoute,
    private notificationService: PoNotificationService,
    private usuariosService: UserService,
    private tecnicoService: TecnicosService
  ) { }

  ngOnInit(): void {
    this.retornaUsuarios();
    if (this.router.url.indexOf('add') != -1) {
      this.tipoTela = 'add';
      this.page.title = 'Adicionar Técnico';
      this.disabledId = true;
      this.page.breadcrumb.items = [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Técnico' },
        { label: 'Adicionar Técnico' }
      ],
        this.page.actions = [
          { label: 'Salvar', disabled: true, action: () => { this.cadastrarTecnicos(this.tecnicosForm.value) } },
          { label: 'Cancelar', action: () => { this.dialogVoltar() } }
        ];
      this.tecnicosForm.valueChanges
        .subscribe((_) => {
          this.page.actions[0].disabled = this.tecnicosForm.invalid;
        });
    } else if (this.router.url.indexOf('edit') != -1) {
      this.tipoTela = 'edit';
      this.page.title = 'Editar Técnico';
      this.disabledId = true;
      this.disabledFields = true;
      this.disabledEdit = false;
      this.page.breadcrumb.items = [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Técnico' },
        { label: 'Editar Técnico' }
      ],
        this.page.actions = [
          { label: 'Salvar', disabled: true, action: () => { this.alterTecnicos() } },
          { label: 'Cancelar', action: () => { this.dialogVoltar() } }
        ];

      this.route.paramMap
        .subscribe((paramMap: ParamMap) => {
          this.id = paramMap.get('id');
        })
      this.getDetailById(this.id);
      this.tecnicosForm.valueChanges
        .subscribe((_) => {
          this.page.actions[0].disabled = this.tecnicosForm.invalid;
        });
    } else {
      this.tipoTela = 'view';
      this.page.title = 'Visualizar Técnico';
      this.disabledId = true;
      this.disabledFields = true;
      this.disabledEdit = true;
      this.page.breadcrumb.items = [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Técnico' },
        { label: 'Visualizar Técnico' }
      ],
        this.page.actions = [
          { label: 'Salvar', disabled: true },
          { label: 'Cancelar', action: () => this.router.navigate(['cadastros/tecnico/']) }
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
    this.tecnicoService
      .findById(id)
      .subscribe((data: any) => {
        this.tecnico = data;
        let obj = {
          id: data.id,
          idUsuario: data.idUsuario.id,
          criado: new Date(data.criado),
          modificado: new Date(data.modificado),
          criadoPor: data.criadoPor,
          modificadoPor: data.modificadoPor,
          ativo: data.ativo
        };
        this.tecnicosForm.setValue(obj);
        this.loading = false;
      },
        (error: HttpErrorResponse) => {
          this.notificationService.error(`Técnico ${id} não encontrada`);
          this.router.navigate(['cadastros/tecnico/'])
          this.loading = false;
        })
  }

  alterTecnicos() {
    this.loading = true;
    if (this.tecnicosForm.invalid) {
      this.notificationService.warning('Formulário Inválido!');
      this.loading = false;
      return;
    } else {
      this.tecnico.ativo = this.tecnicosForm.controls.ativo.value;
      this.tecnicoService
        .alterTecnico(this.tecnico)
        .subscribe((data) => {
          this.notificationService.success('Técnico alterado com sucesso!');
          this.router.navigate(['cadastros/tecnico/']);
          this.loading = false;
        },
          (error: HttpErrorResponse) => {
            console.error(error['message'])
            this.loading = false;
          })
    }
  }

  cadastrarTecnicos(tecnico: Tecnico) {
    this.loading = true;
    if (this.tecnicosForm.invalid) {
      this.notificationService.warning('Formulário Inválido!');
      this.loading = false;
      return;
    } else {
      const obj = {
        idUsuario: {
          id: tecnico.idUsuario
        },
        ativo: tecnico.ativo
      }
      this.tecnicoService
        .addTecnico(obj)
        .subscribe((data: any) => {
          this.notificationService.success('Técnico cadastrado com sucesso!');
          this.router.navigate(['cadastros/tecnico/view', data.id]);
          this.loading = false;
        },
          (error: HttpErrorResponse) => {
            console.error(error['message'])
            this.loading = false;
          })
    }
  }

  private retornaUsuarios() {
    this.usuariosService
      .getUser("ativo=true")
      .subscribe((data: any) => {
        let arr = data.map((item) => {
          return <PoSelectOption>{ label: item.nomeCompleto, value: item.id }
        })
        this.selects.usuarios = arr;
      })
  }

  private dialogVoltar() {
    this.dialog.confirm({
      confirm: () => this.router.navigate(['cadastros/tecnico/']),
      title: 'Alerta',
      message: 'Salve para não perder os dados. Deseja voltar a tela de listagem?'
    })
  }

}