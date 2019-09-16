import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoBreadcrumbItem } from '@portinari/portinari-ui';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chamados-edit',
  templateUrl: './chamados-edit.component.html',
  styleUrls: ['./chamados-edit.component.css']
})
export class ChamadosEditComponent implements OnInit {

  page: PoPageDefault = {
    actions: [
      {
        label: 'Salvar', action: () => {
          console.log(this.chamadosForm.value);
        },
        icon: 'po-icon po-icon-ok'
      },
      { label: 'Voltar', action: () => { this.location.back() } }
    ],
    breadcrumb: {
      items: []
    },
    title: ''
  }

  constValue = {
    tipoChamado: '',
    action: '',
    readonly: <boolean> false
  }

  chamadosForm: FormGroup;

  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe((paramMap: ParamMap) => {
        this.constValue.action = paramMap.get('action');
        this.constValue.tipoChamado = paramMap.get('tipoChamado');
      })
    this.disabledButton(this.constValue.action);
    this.tipoChamado(this.constValue.tipoChamado);
    this.alterBreadcrumb(this.constValue.tipoChamado, this.constValue.action);
  }

  private disabledButton(action: String) {
    if (action == 'visualizar') {
      this.page.actions[0].disabled = true;
      this.constValue.readonly = true;
    }
  }

  private tipoChamado(tipoChamado: String) {
    if (tipoChamado == 'externo') {
      this.page.title = 'Chamado Externo';
      this.chamadosForm = this.fb.group({
        id: ['', [Validators.required]],
        idEmpresa: ['', [Validators.required]],
        idUser: ['', [Validators.required]],
        dataAbertura: ['', [Validators.required]],
        horaAbertura: ['', [Validators.required]],
        dataFechamento: ['', [Validators.required]],
        horaFechamento: ['', [Validators.required]],
        tempo: ['', [Validators.required]],
        status: ['', [Validators.required]],
        idStatus: ['', [Validators.required]],
        tipo: ['', [Validators.required]],
        assunto: ['', [Validators.required]],
        descricao: ['', [Validators.required]],
        solucao: ['', [Validators.required]],
        anexo: ['', [Validators.required]]
      });
    } else {
      this.page.title = 'Chamado Interno';
      this.chamadosForm = this.fb.group({
        id: ['', []],
        idEmpresa: ['', []],
        idAnalista: ['', []],
        dataAbertura: ['', []],
        horaAbertura: ['', []],
        dataFechamento: ['', []],
        horaFechamento: ['', []],
        tempo: ['', []],
        status: ['', []],
        idStatus: ['', []],
        tipo: ['', []],
        assunto: ['', []],
        descricao: ['', []],
        solucao: ['', []],
      })
    }
  }

  private alterBreadcrumb(tipoChamado, action) {
    let item: PoBreadcrumbItem[] = [];
    if (tipoChamado == 'externo' && action == 'visualizar') {
      item = [
        { label: 'Home' },
        { label: 'Chamados' },
        { label: 'Externo' },
        { label: 'Visualizar' }
      ]
    } else if (tipoChamado == 'externo' && action == 'editar') {
      item = [
        { label: 'Home' },
        { label: 'Chamados' },
        { label: 'Externo' },
        { label: 'Editar' }
      ]
    } else if (tipoChamado == 'interno' && action == 'visualizar') {
      item = [
        { label: 'Home' },
        { label: 'Chamados' },
        { label: 'Interno' },
        { label: 'Visualizar' }
      ]
    } else {
      item = [
        { label: 'Home' },
        { label: 'Chamados' },
        { label: 'Interno' },
        { label: 'Editar' }
      ]
    }
    this.page.breadcrumb.items = item;
  }
}