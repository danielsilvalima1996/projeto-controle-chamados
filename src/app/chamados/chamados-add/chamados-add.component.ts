import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoBreadcrumbItem } from '@portinari/portinari-ui';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Route, Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-chamados-add',
  templateUrl: './chamados-add.component.html',
  styleUrls: ['./chamados-add.component.css']
})
export class ChamadosAddComponent implements OnInit {

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
        { label: 'Chamados' }
      ]
    }
  }

  constValue = {
    tipoChamado: '',
    visibilidade: true,
    action: ''
  }

  chamadosForm: FormGroup = this.fb.group({
    idEmpresa: ['', [Validators.required]],
    idAnalista: ['', []],
    idUsuario: ['', []],
    dataAbertura: ['', [Validators.required]],
    horaAbertura: ['', [Validators]],
    dataFechamento: ['', []],
    horaFechamento: ['', []],
    tempoChamado: ['', []],
    codigoStatusChamado: ['', [Validators.required]],
    tipoChamado: ['', [Validators.required]],
    subtipoChamado: ['', [Validators.required]],
    descricaoChamado: ['', [Validators.required]],
    solucaoChamado: ['', []]
  })

  

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.router.url.toString().indexOf('externo') != -1) {
      this.constValue.tipoChamado = 'externo';
    } else {
      this.constValue.tipoChamado = 'interno';
    }

    this.tipoChamado(this.constValue.tipoChamado);
  }

  private tipoChamado(tipoChamado) {
    let item: PoBreadcrumbItem[] = [];
    if (tipoChamado == 'externo') {
      this.constValue.visibilidade = true;
      this.page.title = 'Adicionar Chamado Externo';
      item = [
        { label: 'Externo' },
        { label: 'Adicionar' }
      ]
    } else {
      this.constValue.visibilidade = false;
      this.page.title = 'Adicionar Chamado Interno';
      item = [
        { label: 'Interno' },
        { label: 'Adicionar' }
      ]
    }
    item.map((item) => {
      this.page.breadcrumb.items.push(item);
    })
  }

}
