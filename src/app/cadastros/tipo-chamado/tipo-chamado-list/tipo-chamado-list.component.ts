import { Component, OnInit } from '@angular/core';
import { PoPageAction, PoBreadcrumb, PoBreadcrumbItem, PoTableColumn, PoSelectOption } from '@portinari/portinari-ui';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TipoChamadoService } from 'src/app/services/chamados/tipo-chamado/tipo-chamado.service';
import { UtilService } from 'src/app/services/utils/util-service/util.service';

@Component({
  selector: 'app-tipo-chamado-list',
  templateUrl: './tipo-chamado-list.component.html',
  styleUrls: ['./tipo-chamado-list.component.css']
})
export class TipoChamadoListComponent implements OnInit {

  page = {
    actions: <PoPageAction[]>[
      { label: 'Novo', url: 'tipo-chamado/add' },
      { label: 'Editar', action: () => {this.router.navigate(['edit', this.constValue.selecionado], {relativeTo:this.route})}}
    ],

    title: 'Tipos de Chamado',
    breadcrumb: <PoBreadcrumb>{
      items: <PoBreadcrumbItem[]>[
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Tipos Chamado' }
      ]
    }
  }

  table = {
    columns: <PoTableColumn[]>[
      { property: 'id', label: 'ID', width: '10%' },
      { property: 'descricao', label: 'Descrição', width: '30%' },
      { property: 'created', label: 'Criado ', width: '10%', type: 'date', format: 'dd/MM/yyyy' },
      { property: 'modified', label: 'Modificado ', width: '10%', type: 'date', format: 'dd/MM/yyyy' },
      { property: 'active', label: 'Ativo', width: '10%', type:'boolean' }
    ],
    items: [],
    height: 0,
    loading: false
  }

  selects = {
    pesquisa: <PoSelectOption[]>[
      { label: 'ID', value: 'id' },
      { label: 'DESCRIÇÃO', value: 'descricao' },
      { label: 'ATIVO', value: 'active' },
    ],
    filtro: <PoSelectOption[]>[
      { label: 'SIM', value: 'true' },
      { label: 'NÃO', value: 'false' }
    ]
  }

  tipoChamadoForm: FormGroup = this.fb.group({
    filtro: ['', [Validators.required]],
    pesquisa: ['']
  })

  constValue = {
    selecionado:'',
    input: <Boolean>true,
    select:<Boolean>false,
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private tipoChamadoService: TipoChamadoService,
    private utilService: UtilService
  ) { }

  ngOnInit() {
    this.controls.pesquisa
    .valueChanges.subscribe((data) => {
      this.tipoForm(data);
    })
    this.getTipoChamado(this.tipoChamadoForm.value);
  }

  get controls() {
    return this.tipoChamadoForm.controls;
  }

  tipoForm(tipo) {
    if (tipo == 'active') {
      this.constValue.input = false;
      this.constValue.select = true;
    } else {
      this.constValue.input = true;
      this.constValue.select = false;
    }
  }

   getTipoChamado(form?) {
    this.tipoChamadoService.getTipoChamado(this.utilService.getParameters(form))
      .subscribe((data:any) => {
        this.table.items = data.content
      })
  }

  getSelected(event) {
    this.constValue.selecionado = event.id;
    
  }

}