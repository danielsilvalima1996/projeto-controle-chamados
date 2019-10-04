import { Component, OnInit } from '@angular/core';
import { PoPageDefault } from '@portinari/portinari-ui';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-chamados-add',
  templateUrl: './chamados-add.component.html',
  styleUrls: ['./chamados-add.component.css']
})
export class ChamadosAddComponent implements OnInit {

  page: PoPageDefault = {
    title: 'Novo de Chamado',
    actions: [
      {
        label: 'Voltar', icon: 'po-icon po-icon-arrow-left', action: () => {
          this.location.back();
        }
      }
    ],
    breadcrumb: {
      items: [
        { label: 'Home' },
        { label: 'Novo Chamado' }
      ]
    }
  }

  constValue = {
    tipoChamado: ''
  }

  chamadoInternoForm: FormGroup;
  chamadoExternoForm: FormGroup;

  constructor(
    private location: Location,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    let router = this.router.url.toString();
    this.changeTitle(router);
  }

  private changeTitle(router: string) {
    let fb: FormGroup[];
    if (router == '/chamados/interno/add') {
      fb = [];
      this.constValue.tipoChamado = 'interno';
      this.page.title = ' Abir Chamado Interno';

      this.chamadoInternoForm = this.fb.group({
        idStatus: ['', []],
        id: ['', []],
        idEmpresa: ['', []],
        idAnalista: ['', []],
        dataAbertura: ['', []],
        horaAbertura: ['', []],
        dataFechamento: ['', []],
        horaFechamento: ['', []],
        tempo: ['', []],
        status: ['', []],
        tipo: ['', []],
        assunto: ['', []],
        descricao: ['', []],
        solucao: ['', []],
      })


    } else {
      fb = [];
      this.page.title = 'Chamados Externos';
      this.constValue.tipoChamado = 'externo';

      this.chamadoExternoForm = this.fb.group({
        idStatus: ['', []],
        id: ['', []],
        idEmpresa: ['', []],
        idAnalista: ['', []],
        idUser:['',[]],
        dataAbertura: ['', []],
        horaAbertura: ['', []],
        dataFechamento: ['', []],
        horaFechamento: ['', []],
        tempo: ['', []],
        status: ['', []],
        tipo: ['', []],
        assunto: ['', []],
        descricao: ['', []],
        solucao: ['', []],
      })
    }



    // private getChamadosExternos(parameters?: any) {
    //   this.chamadosExternosService
    //     .getChamadosExternos(parameters)
    //     .subscribe((data) => {
    //       this.table.items = data;
    //     })
    // }

    // private getChamadosInternos(parameters?: any) {
    //   this.chamadosInternosService
    //     .getChamadosInternos(parameters)
    //     .subscribe((data) => {
    //       this.table.items = data;
    //     })
    // }

  }
}
