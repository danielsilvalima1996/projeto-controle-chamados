import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PoTableColumn, PoPageAction, PoBreadcrumb, PoBreadcrumbItem, PoTableAction, PoSelectOption } from '@portinari/portinari-ui';
import { AnalistaListService } from 'src/app/services/analista/analista-list.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-analista-list',
  templateUrl: './analista-list.component.html',
  styleUrls: ['./analista-list.component.css']
})
export class AnalistaListComponent implements OnInit {

  page = {
    actions: <PoPageAction[]>[
      { label: 'Novo', icon: 'po-icon po-icon-user-add', url: 'analista-list/add' }
    ],

    title: 'Cadastro de Analistas',
    breadcrumb: <PoBreadcrumb>{
      items: <PoBreadcrumbItem[]>[
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Analistas' }
      ]
    }
  }

  table = {
    columns: <PoTableColumn[]>[
      { property: 'idAnalista', label: 'ID', width: '10%' },
      { property: 'nomeAnalista', label: 'Nome', width: '20%' },
      { property: 'emailAnalista', label: 'E-mail', width: '20%' },
      { property: 'created', label: 'Criado em ', width: '20%', type: 'date', format: 'dd/MM/yyyy' },
      { property: 'modified', label: 'Modificado em ', width: '20%', type: 'date', format: 'dd/MM/yyyy' },
      { property: 'status', label: 'Status', width: '10%' }
    ],
    actions: <PoTableAction[]>[
      { label: 'Visualizar', url: 'analista-list/view:id' },
      { label: 'Editar', url: 'analista-list/edit:id' },
    ],
    items: [],
    height: 0,
    loading: false
  }

  analistaform: FormGroup = this.fb.group({
    filtro: ['', [Validators.required]],
    pesquisa:[ '']
  })

  selects = {
    pesquisa: <PoSelectOption[]>[
      { label: 'ID', value: 'id' },
      { label: 'ANALISTA', value: 'analista' },
      { label: 'E-MAIL', value: 'email' },
      { label: 'STATUS', value: 'status' }
    ]
  }

  constructor(
    private fb: FormBuilder,
    private analistaService: AnalistaListService,
    private router: Router,
    private route: ActivatedRoute
  ) { }



  ngOnInit() {
    this.getAnalista()
  }

  private getAnalista() {
    this.analistaService.getAnalista()
      .subscribe((data) => {
        this.table.items = data
      })

  }

  searchdata() {
  }



}
