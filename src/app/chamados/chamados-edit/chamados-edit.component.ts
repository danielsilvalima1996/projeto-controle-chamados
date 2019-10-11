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
      items: [
        { label: 'Externo' },
        { label: 'Editar' }
      ]
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
        this.constValue.action = paramMap.get('acao');
        this.constValue.tipoChamado = paramMap.get('tipoChamado');
      })
    this.disabledButton(this.constValue.action);
    this.tipoChamado(this.constValue.tipoChamado, this.constValue.action);
    console.log(this.constValue);
    
  }

  private disabledButton(action: String) {
    if (action == 'visualizar') {
      this.page.actions[0].disabled = true;
      this.constValue.readonly = true;
    }
  }

  private tipoChamado(tipoChamado, action) {
    console.log(action);

    let item: PoBreadcrumbItem[] = [];
    if (tipoChamado == 'externo' && action == 'view') {
      this.page.title = 'Visualizar Chamado Externo';
      item = [
        { label: 'Externo' },
        { label: 'Visualizar' }
      ]
    } else if (tipoChamado == 'externo' && action == 'edit') {
      this.page.title = 'Editar Chamado Externo';
      item = [
        { label: 'Externo' },
        { label: 'Editar' }
      ]
    } else if (tipoChamado == 'externo' && action == 'add') {
      this.page.title = 'Adicionar Chamado Externo';
      item = [
        { label: 'Externo' },
        { label: 'Adicionar' }
      ]
    } else if (tipoChamado == 'interno' && action == 'view') {
      this.page.title = 'Visualizar Chamado Interno';
      item = [
        { label: 'Interno' },
        { label: 'Visualizar' }
      ]
    } else if (tipoChamado == 'interno' && action == 'add') {
      this.page.title = 'Adicionar Chamado Interno';
      item = [
        { label: 'Interno' },
        { label: 'Adicionar' }
      ]
    } else {
      this.page.title = 'Editar Chamado Interno';
      item = [
        { label: 'Interno' },
        { label: 'Editar' }
      ]
    }
    item.map((item) => {
      this.page.breadcrumb.items.push(item);  
    })
    // this.page.breadcrumb.items.push(item);
  }
}