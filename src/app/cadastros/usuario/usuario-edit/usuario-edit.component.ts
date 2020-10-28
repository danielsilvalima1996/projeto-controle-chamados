import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoBreadcrumb, PoBreadcrumbItem, PoSelectOption, PoNotificationService, PoDialogService } from '@po-ui/ng-components';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { UserService } from 'src/app/services/cadastros/users/user.service';
import { RegrasService } from 'src/app/services/cadastros/regras/regras.service';
import { EmpresaService } from 'src/app/services/cadastros/empresa/empresa.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Usuario } from 'src/app/interfaces/usuario.model';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {

  public page: PoPageDefault = {
    title: '',
    breadcrumb: <PoBreadcrumb>{
      items: <PoBreadcrumbItem[]>[]
    },
    actions: []
  }


  selects = {
    ativoOptions: <PoSelectOption[]>[
      { label: 'ATIVO', value: 'true' },
      { label: 'INATIVO', value: 'false' }
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

  userForm: FormGroup;

  constructor(
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

    this.userForm = this.fb.group({
      id: [''],
      email: ['', [Validators.email]],
      senha: ['', [Validators.minLength(6), Validators.maxLength(12)]],
      nomeCompleto: ['', [Validators.required]],
      avatar: ['', []],
      ativo: [true, []],
      idRegra: ['', [Validators.required]],
      idEmpresa: ['', [Validators.required]],
      criado: [''],
      modificado: [''],
      criadoPor: [''],
      modificadoPor: [''],
      celular: [''],
      telefone: [''],
      dddCelular: [''],
      dddTelefone: ['']
    })
    if (this.router.url.indexOf('add') != -1) {
      this.tipoTela = 'add';
      this.page.title = 'Adicionar Usuário';
      this.disabledId = true;
      this.page.breadcrumb.items = [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Usuário' },
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

      this.controls["senha"].setValidators([Validators.required, Validators.minLength(6), Validators.maxLength(12)]);

    } else if (this.router.url.indexOf('edit') != -1) {
      this.tipoTela = 'edit';
      this.page.title = 'Editar Usuário';
      this.disabledId = true;
      this.page.breadcrumb.items = [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Usuário' },
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

      this.userForm = this.fb.group({
        id: [''],
        email: ['', [Validators.email]],
        senha: ['', []],
        nomeCompleto: ['', [Validators.required]],
        avatar: ['', []],
        ativo: ['', []],
        idRegra: ['', [Validators.required]],
        idEmpresa: ['', [Validators.required]],
        criado: [''],
        modificado: [''],
        criadoPor: [''],
        modificadoPor: [''],
        celular: [''],
        telefone: [''],
        dddCelular: [''],
        dddTelefone: ['']
      })

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
        { label: 'Usuário' },
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
          avatar: '',
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
          id: this.userForm.controls.idEmpresa.value
        },
        telefone: this.userForm.controls.telefone.value,
        dddTelefone: this.userForm.controls.dddTelefone.value,
        celular: this.userForm.controls.celular.value,
        dddCelular: this.userForm.controls.dddCelular.value,
      }
      this.userService.addUser(obj)
        .subscribe((data: any) => {
          this.notificationService.success('Usuário Cadastrado com Sucesso!');
          this.router.navigate(['cadastros/usuario/view', data.id]);
          this.loading = false;
        },
          (error: HttpErrorResponse) => {
            this.loading = false;
            this.notificationService.error('Erro no Cadastro do Usuário');
          }
        )
    }
  }

  alterarUser(usuario: Usuario) {
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
