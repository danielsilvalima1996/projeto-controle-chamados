import { Component, OnInit } from '@angular/core';
import { PoPageAction, PoBreadcrumb, PoBreadcrumbItem, PoNotificationService, PoSelectOption } from '@po-ui/ng-components';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { SubtipoChamadoService } from 'src/app/services/chamados/subtipo-chamado/subtipo-chamado.service';
import { TipoChamadoService } from 'src/app/services/chamados/tipo-chamado/tipo-chamado.service';

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
        { label: 'Dashboard' },
        { label: 'Cadastros' },
        { label: 'SubTipo Chamado' },
        { label: 'Adicionar SubTipo de Chamado' },
      ]
    },
  }

  selects =  {
    ativoOptions: <PoSelectOption[]> [
      { label: 'ATIVO', value: 'true' },
      { label: 'INATIVO', value: 'false' }
    ],
    tipoChamado: <PoSelectOption[]>[]

  }

  subTipoChamadoAddForm: FormGroup = this.fb.group({
    descricao: ['', [Validators.required]],
    active: ['', [Validators.required]],
    idTipoChamado:['',Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private notificationService: PoNotificationService,
    private subTipoChamadoService: SubtipoChamadoService,
    private tipoChamadoService: TipoChamadoService
  ) { }

  ngOnInit() {
    this.subTipoChamadoAddForm.valueChanges.subscribe((_) => {
      this.page.actions[0].disabled = this.subTipoChamadoAddForm.invalid;
    })
    this.getTipoChamado();
  }

  get controls() {
    return this.subTipoChamadoAddForm.controls;
  }

  getTipoChamado() {
    this.tipoChamadoService
      .getTipoChamado()
      .subscribe((data: any) => {
        let arr: Array<any> = data.content;
        arr = arr.map((item: any) => {
          return <PoSelectOption>{ label: `${item.id} - ${item.descricao}`, value: item.id };
        })
        this.selects.tipoChamado = arr;
      })
  }

  createSubtipoChamado() {
    if (this.subTipoChamadoAddForm.invalid) {
      this.notificationService.warning('Formulário Inválido!');
      return;
    }
    else {

      let obj = {
        descricao: this.subTipoChamadoAddForm.controls.descricao.value,
        idTipoChamado:{ id : this.subTipoChamadoAddForm.controls.idTipoChamado.value},
        active:this.subTipoChamadoAddForm.controls.active.value
      }     
      this.subTipoChamadoService
        .createSubtipoChamado(obj)
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

  verificaDescricao(){
    if (this.controls.descricao.value == null || this.controls.descricao.value == '') {
      return;
    } else {
      this.subTipoChamadoService
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
