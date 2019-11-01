import { Component, OnInit, ViewChild } from '@angular/core';

import { PoMenuItem, PoToolbarProfile, PoToolbarAction, PoDialogService, PoModalComponent, PoModalAction, PoNotificationService } from '@portinari/portinari-ui';
import { LoginService } from './services/authentication/login/login.service';
import { User } from './interfaces/user.model';
import { Profile } from 'selenium-webdriver/firefox';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TrocarSenha } from './interfaces/trocarSenha.model';
import { UserService } from './services/cadastros/users/user.service';
import { ErrorSpringBoot } from './interfaces/ErrorSpringBoot.model';
import { Page } from './interfaces/page.model';
import { PermissionsService } from './services/cadastros/permissions/permissions.service';
import { Permission } from './interfaces/permission.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  menus: Array<any> = [] /*[
    {
      label: 'Cadastros', shortLabel: 'Cadastros', icon: 'po-icon po-icon-document-filled',
      subItems: [
        { label: 'Analistas', shortLabel: 'Analistas', link: 'cadastros/analista', icon: 'po-icon po-icon-document-filled' },
        { label: 'Empresas', shortLabel: 'Empresas', link: 'cadastros/empresa', icon: 'po-icon po-icon-document-filled' },
        { label: 'Usuários', shortLabel: 'Usuários', link: 'cadastros/user', icon: 'po-icon po-icon-users' },
        { label: 'Permissões', shortLabel: 'Permissões', link: 'cadastros/permission', icon: 'po-icon po-icon-minus' },
        { label: 'Tipo Chamado', shortLabel: 'Tipo Chamado', link: 'cadastros/tipo-chamado', icon: 'po-icon po-icon-minus' },
        { label: 'SubTipo Chamado', shortLabel: 'SubTipo Chamado', link: 'cadastros/subtipo-chamado', icon: 'po-icon po-icon-minus' },
      ]
    },
    {
      label: 'Chamados', shortLabel: 'Chamados', icon: 'po-icon po-icon-minus', subItems: [
        { label: 'Externo', shortLabel: 'Externo', link: 'chamados/externo', icon: 'po-icon po-icon-minus' },
        { label: 'Interno', shortLabel: 'Interno', link: 'chamados/interno', icon: 'po-icon po-icon-minus' }
      ]
    },
    { label: 'Testing', shortLabel: 'Testing', icon: 'po-icon po-icon-list', link: 'testing' }
    // { label: '', shortLabel: '', link: '', icon: '' },
  ];*/

  profile: PoToolbarProfile;

  profileActions: Array<PoToolbarAction> = [
    {
      label: 'Trocar Senha',
      icon: 'po-icon po-icon-change',
      action: () => this.openModal()
    },
    {
      label: 'Sair',
      icon: 'po-icon po-icon-exit',
      separator: true,
      type: 'danger',
      action: () => this.confirmeLogout()
    }
  ]

  logged: boolean = false;
  idUser: number;
  loading: boolean = false;

  trocarForm: FormGroup = this.fb.group({
    atual: ['', [Validators.required, Validators.minLength(8)]],
    confirme: ['', [Validators.required, Validators.minLength(8)]],
    nova: ['', [Validators.required, Validators.minLength(8)]]
  })

  @ViewChild('trocarSenha', { static: true }) trocarSenha: PoModalComponent;

  constructor(
    private loginService: LoginService,
    private dialogService: PoDialogService,
    private router: Router,
    private notificationService: PoNotificationService,
    private fb: FormBuilder,
    private userService: UserService,
    private permissionsService: PermissionsService
  ) { }

  ngOnInit() {
    this.loginService.getIsLogged$.subscribe((data) => {
      if (data) {
        this.getProfile();
        this.logged = data;
        this.loginService.getUserInformation$.subscribe((data) => {
          if (data.permissions.length < 1) {
            return;
          } else {
            this.permissionsService.findById(data.permissions[0].id).subscribe((data) => {
              this.criarMenu(data.page);
            })
          }
        })
      } else {
        this.logged = data;
        this.router.navigate(['login']);
      }
    })

    this.trocarForm
      .valueChanges
      .subscribe((_) => {
        if ((this.controls.nova.value === this.controls.confirme.value) && this.trocarForm.valid) {
          this.primaryAction.disabled = false;
        } else {
          this.primaryAction.disabled = true;
        }
      })
  }

  get controls() {
    return this.trocarForm.controls;
  }

  //Botões Modais
  primaryAction: PoModalAction = {
    label: 'Trocar Senha', action: () => { this.trocarSenhaFn(); }, disabled: true
  };

  secondayAction: PoModalAction = {
    label: 'Cancelar', action: () => { this.trocarSenha.close(); }
  };

  getProfile() {
    let user: User;
    this.loginService.getUserInformation$.subscribe((data: User) => {
      let profile = {
        title: data.fullName,
        subtitle: data.username,
        avatar: ''
      }
      this.idUser = data.id;
      this.profile = profile;
    })
  }

  confirmeLogout() {
    this.dialogService.confirm({
      title: 'Sair',
      message: 'Deseja Sair?',
      confirm: () => { this.loginService.logout(); },
      cancel: () => { }
    });
  }

  private openModal() {
    this.trocarSenha.title = 'Trocar Senha';
    this.trocarSenha.size = 'md';
    this.trocarSenha.open();
  }

  trocarSenhaFn() {
    this.loading = true;
    let senhas: TrocarSenha = {
      id: this.idUser,
      atual: this.controls.atual.value,
      nova: this.controls.nova.value
    }
    this.userService
      .trocarSenha(senhas)
      .subscribe((data) => {
        this.notificationService.success('Senha alterada com sucesso!');
        this.loading = false;
        this.trocarForm.reset();
      },
        (error: ErrorSpringBoot) => {
          this.notificationService.error(error.message);
          this.loading = false;
        })
  }

  private criarMenu(menu: Array<Page>) {
    let menus: Array<any> = [];
    menu.map((item) => {
      //adicionar os items de primeiro nível
      if (item.parent == 0) {
        item['subItems'] = [];
        menus.push(item);
      } else { // adicionar os filhos de zero
        menus.filter((data) => {
          if (item.parent == data.id) {
            item.link = data.link + item.link;
            return data['subItems'].push(item);
          }
        })
      }
    })
    menus = this.sortMenu(menus);
    this.menus = menus;
  }

  private sortMenu(arr) {

    arr.sort((a, b) => {
      if (a.label < b.label) {
        return -1;
      } else if (a.label > b.label) {
        return 1;
      } else {
        return 0;
      }
    });

    for (let item of arr) {
      if ('subItems' in item) {
        item.subItems = this.sortMenu(item.subItems);
      }
    };

    return arr;
  }
}