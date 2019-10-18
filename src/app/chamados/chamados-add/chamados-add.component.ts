import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoBreadcrumbItem, PoSelectOption } from '@portinari/portinari-ui';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UtilService } from 'src/app/services/utils/util-service/util.service';
import { TipoChamadoService } from 'src/app/services/chamados/tipo-chamado/tipo-chamado.service';
import { SubtipoChamadoService } from 'src/app/services/chamados/subtipo-chamado/subtipo-chamado.service';

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

  selects = {
    tipoChamado: <PoSelectOption[]>[],
    subtipoChamado: <PoSelectOption[]>[]
  }

  constValue = {
    tipoChamado: '',
    visibilidade: <boolean>false
  }

  chamadosForm: FormGroup = this.fb.group({
    idEmpresa: ['', [Validators.required]],
    idAnalista: ['', []],
    idUsuario: ['', []],
    dataAbertura: ['', [Validators.required]],
    horaAbertura: ['', [Validators.required]],
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
    private router: Router,
    private utilService: UtilService,
    private tipoChamadoService: TipoChamadoService,
    private subtipoChamadoService: SubtipoChamadoService
  ) { }

  ngOnInit() {
    if (this.router.url.toString().indexOf('externo') != -1) {
      this.constValue.tipoChamado = 'externo';
    } else {
      this.constValue.tipoChamado = 'interno';
    }
    this.tipoTela(this.constValue.tipoChamado);
    this.controls.dataAbertura.setValue(this.utilService.dataAtual());
    this.controls.horaAbertura.setValue(this.utilService.horaAtual());
    this.tipoChamado();
  }

  get controls() {
    return this.chamadosForm.controls;
  }
 
  private tipoTela(tipoChamado) {
    let item: PoBreadcrumbItem[] = [];
    if (tipoChamado == 'externo') {
      this.constValue.visibilidade = false;
      this.page.title = 'Adicionar Chamado Externo';
      item = [
        { label: 'Externo' },
        { label: 'Adicionar' }
      ]
    } else {
      this.constValue.visibilidade = true;
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

  private tipoChamado() {
    this.tipoChamadoService
    .findAll()
    .subscribe((data) => {
      console.log(data);
      
      data.map((item) =>{
        return <PoSelectOption>{label: item.descricao, value: item.id};
      })
    })
  }

}
