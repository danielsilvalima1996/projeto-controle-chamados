import { Component, OnInit } from '@angular/core';
import { PoSelectOption, PoPageDefault, PoNotificationService } from '@portinari/portinari-ui';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { SubtipoChamado } from 'src/app/interfaces/subtipo-chamado.model';
import { SubtipoChamadoService } from 'src/app/services/chamados/subtipo-chamado/subtipo-chamado.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TipoChamadoService } from 'src/app/services/chamados/tipo-chamado/tipo-chamado.service';

@Component({
  selector: 'app-subtipo-chamado-edit',
  templateUrl: './subtipo-chamado-edit.component.html',
  styleUrls: ['./subtipo-chamado-edit.component.css']
})
export class SubtipoChamadoEditComponent implements OnInit {

  page: PoPageDefault = {

    title: 'Editar SubTipo Chamado',
    actions: [
      { label: 'Salvar', disabled: true, action: () => { this.saveSubTipoChamado() } },
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

  selects = {
    ativoOptions: <PoSelectOption[]>[
      { label: 'ATIVA', value: 'true' },
      { label: 'INATIVA', value: 'false' }
    ],
    tipoChamado: <PoSelectOption[]>[]

  }

  constValue = {
    id: <number>0
  }

  subTipoChamadoEditForm: FormGroup = this.fb.group({
    descricao: ['', [Validators.required, Validators.minLength(5)]],
    active: ['', [Validators.required]],
    idTipoChamado: ['', Validators.required],
    id: ['', []],
    created: ['', []],
    modified: ['', []],
  });

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private subTipoChamadoService: SubtipoChamadoService,
    private notificationService: PoNotificationService,
    private route: ActivatedRoute,
    private tipoChamadoService: TipoChamadoService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((param: ParamMap) => {
      this.getSubtipoChamado(parseInt(param.get('id'), 10));
    })
    this.tipoChamado();
    this.subTipoChamadoEditForm.valueChanges.subscribe((_) => {
      this.page.actions[0].disabled = this.subTipoChamadoEditForm.invalid;
    })
  }

  get controls() {
    return this.subTipoChamadoEditForm.controls;
  }

  private getSubtipoChamado(id: number) {
    this.subTipoChamadoService
      .findById(id)
      .subscribe((data) => {
        let obj = {
          id: data.id,
          descricao: data.descricao,
          active: data.active,
          idTipoChamado: data.id,
          created: data.created.toString().substr(0, 10),
          modified: data.modified.toString().substr(0, 10)
        }
        this.subTipoChamadoEditForm.setValue(Object.assign({}, obj));
      })
  }

  private tipoChamado() {
    this.tipoChamadoService
    .findAll()
    .subscribe((data) => {
      let arr = data.map((item) => {
        return <PoSelectOption>{label: item.descricao, value: item.id}
      })
      this.selects.tipoChamado = arr;
    })
  }

  private saveSubTipoChamado() {
    let subtipo = {
      id: this.controls.id.value,
      descricao: this.controls.descricao.value,
      active: this.controls.active.value,
      created: this.controls.created.value,
      modified: this.controls.modified.value,
      idTipoChamado: {id: {id: this.controls.idTipoChamado.value}}
    }
    this.subTipoChamadoService
      .alterSubTipoChamado(subtipo)
      .subscribe((data) => {
        this.notificationService.success('SubTipo de Chamado alterado com sucesso!');
        this.location.back();
      },
        (error: any) => {
          this.notificationService.error('Erro ao salvar SubTipoChamado!');
        })
  }

}
