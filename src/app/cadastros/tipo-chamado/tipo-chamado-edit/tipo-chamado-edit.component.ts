import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoSelectOption, PoNotificationService } from '@portinari/portinari-ui';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TipoChamado } from 'src/app/interfaces/tipo-chamado.model';
import { Location } from '@angular/common';
import { TipoChamadoService } from 'src/app/services/chamados/tipo-chamado/tipo-chamado.service';

@Component({
  selector: 'app-tipo-chamado-edit',
  templateUrl: './tipo-chamado-edit.component.html',
  styleUrls: ['./tipo-chamado-edit.component.css']
})
export class TipoChamadoEditComponent implements OnInit {

  page: PoPageDefault = {

    title: 'Editar Tipo de Chamado',
    actions: [
      { label: 'Salvar', disabled: true, action: () => { this.saveRole(this.tipoChamadoEditForm.value) } },
      { label: 'Voltar', icon: 'po-icon po-icon-arrow-left', action: () => { (this.location.back()) } },
    ],
    breadcrumb: {
      items: [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Tipos Chamado' },
        { label: 'Editar Tipo de Chamado' }
      ]
    }

  }

  selects = {
    active: <PoSelectOption[]>[
      { label: 'ATIVO', value: 'true' },
      { label: 'INATIVO', value: 'false' }
    ]
  }

  tipoChamadoEditForm: FormGroup = this.fb.group({
    id: ['', []],
    descricao: ['', [Validators.required]],
    active: ['', [Validators.required]],
    created: ['', []],
    modified: ['', []],
  })

  constValue = {
    id: ''
  }


  constructor(
    private location: Location,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private tipoChamadoService: TipoChamadoService,
    private notificationService: PoNotificationService
  ) { }

  ngOnInit() {
    this.tipoChamadoEditForm.valueChanges.subscribe((_) => {
      this.page.actions[0].disabled = this.tipoChamadoEditForm.invalid;
    })

    this.route.paramMap
      .subscribe((params: ParamMap) => {
        this.constValue.id = params.get('id');
      })
    this.findById(this.constValue.id);
  }

  get controls() {
    return this.tipoChamadoEditForm.controls;
  }

  private findById(id) {
    this.tipoChamadoService
      .findById(id)
      .subscribe((data) => {
        data.created = new Date(data.created);
        data.modified = new Date(data.modified);
        this.tipoChamadoEditForm.setValue(data);
        data.active == true ? this.controls.active.setValue('true') : this.controls.active.setValue('false');
      })
  }

  private saveRole(TipoChamado: TipoChamado) {
    this.tipoChamadoService
      .alterTipoChamado(TipoChamado)
      .subscribe((data) => {
        this.notificationService.success('Tipo de Chamado alterado com sucesso!');
        this.location.back();
      },
        (error: any) => {
          this.notificationService.error('Erro ao salvar regra!');
        })
  }

}

