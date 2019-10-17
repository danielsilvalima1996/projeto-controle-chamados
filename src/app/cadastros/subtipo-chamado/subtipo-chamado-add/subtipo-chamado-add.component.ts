import { Component, OnInit } from '@angular/core';
import { PoPageAction, PoBreadcrumb, PoBreadcrumbItem, PoNotificationService, PoSelectOption } from '@portinari/portinari-ui';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { SubtipoChamadoService } from 'src/app/services/chamados/subtipo-chamado/subtipo-chamado.service';

@Component({
  selector: 'app-subtipo-chamado-add',
  templateUrl: './subtipo-chamado-add.component.html',
  styleUrls: ['./subtipo-chamado-add.component.css']
})
export class SubtipoChamadoAddComponent implements OnInit {

  page = {
    actions: <PoPageAction[]>[
      { label: 'Salvar', disabled: true, action: () => { this.createSubtipoChamado() } },
      { label: 'Cancelar', action: () => { this.location.back() } },
    ],

    title: 'Adicionar SubTipo de Chamado',
    breadcrumb: <PoBreadcrumb>{
      items: <PoBreadcrumbItem[]>[
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'SubTipo Chamado' },
        { label: 'Adicionar SubTipo de Chamado' },
      ]
    },
  }

  selects =  {
    statusOptions: <PoSelectOption[]> [
      { label: 'ATIVA', value: 'true' },
      { label: 'INATIVA', value: 'false' }
    ],
    tipoChamado: <PoSelectOption[]>[]

  }

  subTipoChamadoAddForm: FormGroup = this.fb.group({
    descricao: ['', [Validators.required, Validators.minLength(5)]],
    active: ['', [Validators.required]],
    idTipoChamado:['',Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private notificationService: PoNotificationService,
    private subTipoChamadoService: SubtipoChamadoService
  ) { }

  ngOnInit() {
    this.subTipoChamadoAddForm.valueChanges.subscribe((_) => {
      this.page.actions[0].disabled = this.subTipoChamadoAddForm.invalid;
    })
  }

  createSubtipoChamado() {
    if (this.subTipoChamadoAddForm.invalid) {
      this.notificationService.warning('Formulário Inválido!');
      return;
    }
    else {
      this.subTipoChamadoService
        .createSubtipoChamado(this.subTipoChamadoAddForm.value)
        .subscribe((data) => {
          this.notificationService.success('SubTipo de Chamado Salvo com Sucesso');
          this.location.back();
        },
          (error: HttpErrorResponse) => {
            this.notificationService.error(error.error.meta.message);
          }
        );
    }
  }

}
