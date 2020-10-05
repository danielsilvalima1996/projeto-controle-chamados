import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserService } from 'src/app/services/cadastros/users/user.service';
import { PoSelectOption, PoNotificationService, PoPageDefault, PoBreadcrumb, PoBreadcrumbItem, PoDialogService } from '@po-ui/ng-components';
import { PermissionsService } from 'src/app/services/cadastros/permissions/permissions.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Permission } from 'src/app/interfaces/permission.model';
import { User } from 'src/app/interfaces/user.model';
import { RegrasService } from 'src/app/services/cadastros/regras/regras.service';
import { EmpresaService } from 'src/app/services/cadastros/empresa/empresa.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  public page: PoPageDefault = {
    title: '',
    breadcrumb: <PoBreadcrumb>{
      items: <PoBreadcrumbItem[]>[]
    },
    actions: []
  }


  selects = {
    ativoOptions: <PoSelectOption[]>[
      { label: 'ATIVA', value: 'true' },
      { label: 'INATIVA', value: 'false' }
    ],
    permissoes: <PoSelectOption[]>[],
    empresa: <PoSelectOption[]>[],
    regra: <PoSelectOption[]>[]
  }

  public disabledId: boolean = false;
  public disabledFields: boolean = false;
  private id: string = '';
  public loading: boolean;
  public tipoTela: string;
  public permissions = 0;
  public authorities: [];
  public empresa = []

  userForm: FormGroup = this.fb.group({
    id: [''],
    email: ['', [Validators.email]],
    senha: ['', [Validators.required]],
    nomeCompleto: ['', [Validators.required]],
    avatar: ['', []],
    ativo: ['', []],
    idRegra: ['', [Validators.required]],
    idEmpresa: ['', [Validators.required]],
    // isTecnico: [false, []],
    criado: [''],
    modificado: [''],
    criadoPor: [''],
    modificadoPor: [''],
    celular: ['', Validators.required, Validators.minLength(9)],
    telefone: [''],
    dddCelular: ['', Validators.required],
    dddTelefone: ['']
  })

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private regrasService: RegrasService,
    private notificationService: PoNotificationService,
    private router: Router,
    private dialog: PoDialogService,
    private empresaService: EmpresaService
  ) { }


  ngOnInit() {
    this.retornaEmpresas();
    this.retornaRegras();
    if (this.router.url.indexOf('add') != -1) {
      this.tipoTela = 'add';
      this.page.title = 'Adicionar Usuário';
      this.disabledId = true;
      this.page.breadcrumb.items = [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Usuários' },
        { label: 'Adicionar Usuário' }
      ],
        this.page.actions = [
          { label: 'Salvar', disabled: true, action: () => { this.createUser() } },
          { label: 'Cancelar', action: () => { this.dialogVoltar() } }
        ];
      this.userForm.valueChanges
        .subscribe((_) => {
          this.page.actions[0].disabled = this.userForm.invalid;
        });

    } else if (this.router.url.indexOf('edit') != -1) {
      this.tipoTela = 'edit';
      this.page.title = 'Editar Usuário';
      this.disabledId = true;
      this.page.breadcrumb.items = [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Usuários' },
        { label: 'Editar Usuário' }
      ],
        this.page.actions = [
          { label: 'Salvar', disabled: true, action: () => { this.alterarUser(this.userForm.value) } },
          { label: 'Cancelar', action: () => { this.dialogVoltar() } }
        ];

      this.route.paramMap
        .subscribe((paramMap: ParamMap) => {
          this.id = paramMap.get('id');
        });
      this.findById(this.id);
      this.userForm.valueChanges
        .subscribe((_) => {
          this.page.actions[0].disabled = this.userForm.invalid;
        });

    } else {
      this.tipoTela = 'view';
      this.page.title = 'Visualizar Usuário';
      this.disabledId = true;
      this.disabledFields = true;
      this.page.breadcrumb.items = [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Usuários' },
        { label: 'Visualizar Usuário' }
      ],
        this.page.actions = [
          { label: 'Salvar', disabled: true },
          { label: 'Cancelar', action: () => this.router.navigate(['cadastros/usuario/']) }
        ];
      this.route.paramMap
        .subscribe((paramMap: ParamMap) => {
          this.id = paramMap.get('id');
        })
      this.findById(this.id);
    }


  }

  get controls() {
    return this.userForm.controls;
  }

  private retornaEmpresas() {
    this.empresaService
      .getEmpresa("ativo=true")
      .subscribe((data: any) => {
        let arr = data.map((item) => {
          return <PoSelectOption>{ label: item.nomeFantasia, value: item.id }
        })
        this.selects.empresa = arr;
      })
  }

  private retornaRegras() {
    this.regrasService
      .findAll("ativo=true")
      .subscribe((data: any) => {
        let arr = data.map((item) => {
          return <PoSelectOption>{ label: item.descricao, value: item.id }
        })
        this.selects.regra = arr;
      })
  }

  private findById(id) {
    this.userService
      .findById(id)
      .subscribe((data: any) => {
        console.log(data);
        let obj = {
          id: data.id,
          idEmpresa: data.idEmpresa.id,
          nomeCompleto: data.nomeCompleto,
          senha: data.senha,
          idRegra: data.idRegra.id,
          ativo: data.ativo,
          criado: new Date(data.criado),
          modificado: new Date(data.modificado),
          criadoPor: data.criadoPor,
          modificadoPor: data.modificadoPor,
          dddCelular: data.dddCelular,
          celular: data.celular,
          dddTelefone: data.dddTelefone,
          telefone: data.telefone,
          email: data.email,
          avatar: data.avatar,
          // isTecnico: data.isTecnico

        }
        this.userForm.setValue(obj);
      })
  }

  createUser() {
    this.loading = true;

    if (this.userForm.invalid) {
      this.notificationService.warning('Formulário Inválido!');
      return;
    }
    else {
      const obj = {
        email: this.userForm.controls.email.value,
        senha: this.userForm.controls.senha.value,
        nomeCompleto: this.userForm.controls.nomeCompleto.value,
        idRegra: {
          id: this.userForm.controls.idRegra.value
        },
        idEmpresa: {
          id: this.userForm.controls.idRegra.value
        },
        telefone: this.userForm.controls.telefone.value,
        dddTelefone: this.userForm.controls.dddTelefone.value,
        celular: this.userForm.controls.celular.value,
        dddCelular: this.userForm.controls.dddCelular.value,
        // isTecnico: this.userForm.controls.isTecnico.value
      }
      this.userService.addUser(obj)
        .subscribe(() => {
          this.notificationService.success('Usuário Cadastrado com Sucesso!');
          this.router.navigate(['cadastros/usuario/']);
          this.loading = false;
        },
          (error: HttpErrorResponse) => {
            this.loading = false;
            this.notificationService.error('Erro no Cadastro do Usuário');
          }
        )
    }
  }

  alterarUser(usuario: User) {
    this.loading = true;
    if (this.userForm.invalid) {
      this.notificationService.warning('Formulário Inválido!');
      this.loading = false;
      return;
    } else {
      const obj = {
        id: this.userForm.controls.id.value,
        email: this.userForm.controls.email.value,
        senha: this.userForm.controls.senha.value,
        nomeCompleto: this.userForm.controls.nomeCompleto.value,
        avatar: this.userForm.controls.avatar.value,
        ativo: this.userForm.controls.ativo.value,
        idRegra: {
          id: this.userForm.controls.idRegra.value
        },
        idEmpresa: {
          id: this.userForm.controls.idEmpresa.value
        },
        criado: this.userForm.controls.criado.value,
        modificado: this.userForm.controls.modificado.value,
        criadoPor: this.userForm.controls.criadoPor.value,
        modificadoPor: this.userForm.controls.modificadoPor.value,
        telefone: this.userForm.controls.telefone.value,
        dddTelefone: this.userForm.controls.dddTelefone.value,
        celular: this.userForm.controls.celular.value,
        dddCelular: this.userForm.controls.dddCelular.value
      }
      console.log(obj);

      this.userService
        .alterUser(obj)
        .subscribe((data) => {
          this.notificationService.success('Usuário alterado com sucesso!');
          this.router.navigate(['cadastros/usuario/']);
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
      confirm: () => this.router.navigate(['cadastros/usuario/']),
      title: 'Alerta',
      message: 'Salve para não perder os dados. Deseja voltar a tela de listagem?'
    })
  }


}
