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
    title: '',
    actions: [
      {
        label: 'Voltar', icon: 'po-icon po-icon-arrow-left', action: () => {
          this.location.back();
        }
      }
    ],
    breadcrumb: {
      items: []
    }
  }

  constValue = {
    tipoChamado: '',
    readonly: <boolean>true,
    action: ''
  }

  chamadosForm: FormGroup = this.fb.group({
    idChamado: ['', []],
    idEmpresa: ['', []],
    idAnalista: ['', []],
    idUsuario: ['', []],
    dataAbertura: ['', []],
    horaAbertura: ['', []],
    dataFechamento: ['', []],
    horaFechamento: ['', []],
    tempoChamado: ['', []],
    codigoStatusChamado: ['', []],
    tipoChamado: ['', []],
    subtipoChamado: ['', []],
    descricaoChamado: ['', []],
    solucaoChamado: ['', []]
  })

  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    alert('rota quebrada, verificar, externos e action');
    this.route.paramMap
      .subscribe((paramMap: ParamMap) => {
        this.constValue.action = paramMap.get('action');
        this.constValue.tipoChamado = paramMap.get('tipoChamado');
      })
    this.disabledButton(this.constValue.action);
    this.alterBreadcrumb(this.constValue.tipoChamado, this.constValue.action);
  }
  // {
  //   path: 'externo', children: [
  //     { path: '', component: ChamadosListComponent },
  //     { path: 'add', component: ChamadosEditComponent }
  //     //      { path: ':action/:id', component: ChamadosEditComponent }
  //   ]
  // }
  private disabledButton(action: String) {
    if (action == 'visualizar') {
      this.page.actions[0].disabled = true;
      this.constValue.readonly = true;
    }
  }

  private tipoChamado(tipoChamado: String) {
    if (tipoChamado == 'externo') {

      this.chamadosForm = this.fb.group({
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
    console.log(action);
    
    let item: PoBreadcrumbItem[] = [];
    if (tipoChamado == 'externo' && action == 'view') {
      this.page.title = 'Visualizar Chamado Externo';
      item = [
        { label: 'Home' },
        { label: 'Chamados' },
        { label: 'Externo' },
        { label: 'Visualizar' }
      ]
    } else if (tipoChamado == 'externo' && action == 'edit') {
      this.page.title = 'Editar Chamado Externo';
      item = [
        { label: 'Home' },
        { label: 'Chamados' },
        { label: 'Externo' },
        { label: 'Editar' }
      ]
    } else if (tipoChamado == 'externo' && action == 'add') {
      this.page.title = 'Adicionar Chamado Externo';
      item = [
        { label: 'Home' },
        { label: 'Chamados' },
        { label: 'Externo' },
        { label: 'Adicionar' }
      ]
    } else if (tipoChamado == 'interno' && action == 'view') {
      this.page.title = 'Visualizar Chamado Interno';
      item = [
        { label: 'Home' },
        { label: 'Chamados' },
        { label: 'Interno' },
        { label: 'Visualizar' }
      ]
    } else if (tipoChamado == 'interno' && action == 'add') {
      this.page.title = 'Adicionar Chamado Interno';
      item = [
        { label: 'Home' },
        { label: 'Chamados' },
        { label: 'Interno' },
        { label: 'Adicionar' }
      ]
    } else {
      this.page.title = 'Editar Chamado Interno';
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