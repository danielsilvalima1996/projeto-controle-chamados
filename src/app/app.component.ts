import { Component, OnInit, ViewChild } from '@angular/core';

import { PoMenuItem, PoToolbarProfile, PoToolbarAction, PoDialogService, PoModalComponent, PoModalAction, PoNotificationService } from '@po-ui/ng-components';
import { LoginService } from './services/authentication/login/login.service';
import { User, } from './interfaces/user.model';
import { Profile } from 'selenium-webdriver/firefox';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TrocarSenha } from './interfaces/trocarSenha.model';
import { UserService } from './services/cadastros/users/user.service';
import { ErrorSpringBoot } from './interfaces/ErrorSpringBoot.model';
import { PermissionsService } from './services/cadastros/permissions/permissions.service';
import { Permission } from './interfaces/permission.model';
import { LoginRetorno } from 'src/app/interfaces/login.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public menus: Array<PoMenuItem> = [];

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
    senhaAtual: ['', [Validators.required, Validators.minLength(6)]],
    confirmeSenha: ['', [Validators.required, Validators.minLength(6)]],
    Senhanova: ['', [Validators.required, Validators.minLength(6)]]
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
    this.loginService.getIsLogged$
      .subscribe((data) => {
        if (data) {
          this.getProfile();
          this.logged = data;

          this.loginService.getUserInformation$
            .subscribe((data) => {
              this.menus = data.menu;
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

  secondaryAction: PoModalAction = {
    label: 'Cancelar', action: () => { this.trocarSenha.close(); }
  };

  getProfile() {
    let user: User;
    this.loginService.getUserInformation$
      .subscribe((data: LoginRetorno) => {
        let profile = {
          title: data.nomeCompleto,
          subtitle: data.email,
          avatar: data.avatar
        }
        this.idUser = data.id;
        this.profile = profile;
      })
  }

  confirmeLogout() {
    this.dialogService.confirm({
      title: 'Sair',
      message: 'Deseja realmente sair?',
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
    let senhas = {
      senhaAtual: this.controls.senhaAtual.value,
      senhaNova: this.controls.senhaNova.value
    }
    this.userService
      .trocarSenha(senhas)
      .subscribe((data) => {
        this.notificationService.success('Senha alterada com sucesso!');
        this.loading = false;
        this.trocarForm.reset();
        this.trocarSenha.close();
      },
        (error: ErrorSpringBoot) => {
          this.notificationService.error(error.message);
          this.loading = false;
        })
  }

}