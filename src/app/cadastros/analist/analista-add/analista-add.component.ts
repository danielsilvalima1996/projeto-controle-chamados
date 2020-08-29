import { Component, OnInit } from '@angular/core';
import { PoPageAction, PoBreadcrumb, PoBreadcrumbItem, PoNotificationService } from '@po-ui/ng-components';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { AnalistaService } from 'src/app/services/cadastros/analista/analista.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-analista-add',
  templateUrl: './analista-add.component.html',
  styleUrls: ['./analista-add.component.css']
})
export class AnalistaAddComponent implements OnInit {

  page = {
    actions: <PoPageAction[]>[
      { label: 'Salvar', disabled: true, action: () => { this.addAnalista() } },
      { label: 'Cancelar', action: () => { this.location.back() } },
    ],

    title: 'Cadastro de Analistas',
    breadcrumb: <PoBreadcrumb>{
      items: <PoBreadcrumbItem[]>[
        { label: 'Dashboard' },
        { label: 'Cadastros' },
        { label: 'Analistas' },
        { label: 'Adicionar Analistas' },
      ]
    },
    ativoOptions: [
      { label: 'ATIVO', value: true },
      { label: 'INATIVO', value: false }
    ]
  }

  analistAddForm: FormGroup = this.fb.group({
    nome: ['', [Validators.required]],
    email: ['', [Validators.required]],
    matricula: ['', []],
    ativo: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private analistaService: AnalistaService,
    private notificationService: PoNotificationService
  ) { }

  ngOnInit() {
    this.analistAddForm.valueChanges.subscribe((_) => {
      this.page.actions[0].disabled = this.analistAddForm.invalid;
    })
  }

  get controls() {
    return this.analistAddForm.controls;
  }
  addAnalista() {
    this.analistaService.addAnalista(this.analistAddForm.value)
      .subscribe((data) => {
        this.notificationService.success('Analista salvo com Sucesso');
        this.location.back();
      },
        (error: HttpErrorResponse) => {
          this.notificationService.error(error.error.meta.message);
        }
      );
  }

  verificaEmail() {
    if (this.controls.email.value == null || this.controls.email.value == '') {
      return;
    } else {
      this.analistaService
        .verificaEmail(this.controls.email.value)
        .subscribe((data) => {
          if (data) {
            this.notificationService.error('E-mail já cadastrado!');
            this.page.actions[0].disabled = true;
          } else {
            this.notificationService.success('E-mail válido!');
          }
        })
    }
  }

  verificaMatricula() {
    if (this.controls.matricula.value == null || this.controls.matricula.value == '') {
      return;
    } else {
      this.analistaService
        .verificaMatricula(this.controls.matricula.value)
        .subscribe((data) => {
          if (data) {
            this.notificationService.error('Matricula já cadastrado!');
            this.page.actions[0].disabled = true;
          } else {
            this.notificationService.success('Matricula válido!');
          }
        })
    }
  }

}
