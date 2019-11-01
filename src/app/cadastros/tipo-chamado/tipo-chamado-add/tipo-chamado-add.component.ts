import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { PoPageAction, PoBreadcrumb, PoBreadcrumbItem, PoNotificationService, PoSelectOption } from '@portinari/portinari-ui';
import { HttpErrorResponse } from '@angular/common/http';
import { TipoChamadoService } from 'src/app/services/chamados/tipo-chamado/tipo-chamado.service';

@Component({
  selector: 'app-tipo-chamado-add',
  templateUrl: './tipo-chamado-add.component.html',
  styleUrls: ['./tipo-chamado-add.component.css']
})
export class TipoChamadoAddComponent implements OnInit {
  
  page = {
    actions: <PoPageAction[]>[
      { label: 'Salvar', disabled: true, action: () => { this.createTipoChamado() } },
      { label: 'Cancelar', action: () => { this.location.back() } },
    ],

    title: 'Adicionar Tipo de Chamado',
    breadcrumb: <PoBreadcrumb>{
      items: <PoBreadcrumbItem[]>[
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Tipos Chamado' },
        { label: 'Adicionar Tipo de Chamado' },
      ]
    }
  }

  selects = {
    ativoOptions: [
      { label: 'ATIVA', value: true },
      { label: 'INATIVA', value: false }
    ]
  }

  tipoChamadoAddForm: FormGroup = this.fb.group({
    descricao: ['', [Validators.required]],
    active: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private notificationService: PoNotificationService,
    private tipoChamadoService: TipoChamadoService
  ) { }

  ngOnInit() {
    this.tipoChamadoAddForm.valueChanges.subscribe((_) => {
      this.page.actions[0].disabled = this.tipoChamadoAddForm.invalid;
    })
  }

  get controls() {
    return this.tipoChamadoAddForm.controls;
  }

  createTipoChamado() {   
    if (this.tipoChamadoAddForm.invalid) {
      this.notificationService.warning('Formulário Inválido!');
      return;
    }
    else {
      this.tipoChamadoService
        .createTipoChamado(this.tipoChamadoAddForm.value)
        .subscribe((data) => {
          this.notificationService.success('Tipo de Chamado Salvo com Sucesso');
          this.location.back();
        },
          (error: HttpErrorResponse) => {
            this.notificationService.error(error.error.meta.message);
          }
        );
    }
  }

  verificaDescricao(){
    if (this.controls.descricao.value == null || this.controls.descricao.value == '') {
      return;
    } else {
      this.tipoChamadoService
        .verificaDescricao(this.controls.descricao.value)
        .subscribe((data) => {
          if (data) {
            this.notificationService.error('Descrição já cadastrada!');
            this.page.actions[0].disabled = true;
          } else {
            this.notificationService.success('Descrição válida!');
          }
        })
    }
  }

}
