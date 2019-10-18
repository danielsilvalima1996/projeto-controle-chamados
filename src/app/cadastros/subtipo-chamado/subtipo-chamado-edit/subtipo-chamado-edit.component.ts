import { Component, OnInit } from '@angular/core';
import { PoSelectOption, PoPageDefault, PoNotificationService } from '@portinari/portinari-ui';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { SubtipoChamado } from 'src/app/interfaces/subtipo-chamado.model';
import { SubtipoChamadoService } from 'src/app/services/chamados/subtipo-chamado/subtipo-chamado.service';

@Component({
  selector: 'app-subtipo-chamado-edit',
  templateUrl: './subtipo-chamado-edit.component.html',
  styleUrls: ['./subtipo-chamado-edit.component.css']
})
export class SubtipoChamadoEditComponent implements OnInit {

  page: PoPageDefault = {

    title: 'Editar SubTipo Chamado',
    actions: [
      { label: 'Salvar', disabled: true, action: () => { this.saveSubTipoChamado(this.subTipoChamadoEditForm.value) } },
      { label: 'Voltar', icon: 'po-icon po-icon-arrow-left', action: () => { (this.location.back()) } },
    ],
    breadcrumb: {
      items: [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'SubTipo Chamado' },
        { label: 'Editar SubTipo Chamado' }
      ]
    }

  }

  selects =  {
    statusOptions: <PoSelectOption[]> [
      { label: 'ATIVA', value: 'true' },
      { label: 'INATIVA', value: 'false' }
    ],
    tipoChamado: <PoSelectOption[]>[]

  }

  subTipoChamadoEditForm: FormGroup = this.fb.group({
    descricao: ['', [Validators.required, Validators.minLength(5)]],
    active: ['', [Validators.required]],
    idTipoChamado:['',Validators.required],
    id: ['', []],
    created: ['', []],
    modified: ['', []],
  });

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private subTipoChamadoService: SubtipoChamadoService,
    private notificationService: PoNotificationService
  ) { }

  ngOnInit() {
  }

  get controls() {
    return this.subTipoChamadoEditForm.controls;
  }

  private saveSubTipoChamado(subTipoChamado: SubtipoChamado) {
    this.subTipoChamadoService
      .alterSubTipoChamado(subTipoChamado)
      .subscribe((data) => {
        this.notificationService.success('SubTipo de Chamado alterado com sucesso!');
        this.location.back();
      },
        (error: any) => {
          this.notificationService.error('Erro ao salvar SubTipoChamado!');
        })
  }

}
