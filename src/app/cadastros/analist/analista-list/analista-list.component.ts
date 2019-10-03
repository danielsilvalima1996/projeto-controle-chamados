import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PoTableColumn, PoPageAction, PoBreadcrumb, PoBreadcrumbItem, PoTableAction, PoSelectOption, PoNotificationService } from '@portinari/portinari-ui';
import { AnalistaListService } from 'src/app/services/cadastros/analista/analista-list.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-analista-list',
  templateUrl: './analista-list.component.html',
  styleUrls: ['./analista-list.component.css']
})
export class AnalistaListComponent implements OnInit {

  page = {
    actions: <PoPageAction[]>[
      { label: 'Novo', icon: 'po-icon po-icon-user-add', url: 'analista-list/add' },
      // { label: 'Editar', url: 'analista-list/edit:id' },
      { label: 'Editar', action: () => { this.router.navigate(['edit', this.constValue.itemSelecionado],{relativeTo:this.route}) } },
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
      { property: 'id', label: 'ID', width: '10%' },
      { property: 'nome', label: 'Nome', width: '20%' },
      { property: 'email', label: 'E-mail', width: '20%' },
      { property: 'matricula', label:'Matricula', width:'10%'},
      { property: 'created', label: 'Criado em ', width: '15%', type: 'date', format: 'dd/MM/yyyy' },
      { property: 'modified', label: 'Modificado em ', width: '15%', type: 'date', format: 'dd/MM/yyyy' },
      { property: 'active', label: 'Status', width: '10%' }
    ],
    items: [],
    height: 0,
    loading: false
  }

  analistaform: FormGroup = this.fb.group({
    filtro: ['', [Validators.required]],
    pesquisa: ['']
  })

  selects = {
    pesquisa: <PoSelectOption[]>[
      { label: 'ID', value: 'id' },
      { label: 'ANALISTA', value: 'analista' },
      { label: 'E-MAIL', value: 'email' },
      { label: 'STATUS', value: 'status' }
    ]
  }

  constValue = {
    itemSelecionado: ''
  }

  constructor(
    private fb: FormBuilder,
    private analistaService: AnalistaListService,
    private router: Router,
    private notificationService: PoNotificationService,
    private route: ActivatedRoute
  ) { }



  ngOnInit() {
    this.getAnalista()
  }

  get controls() {
    return this.analistaform.controls;
  }

  private getAnalista(parameters?:any) {
    this.analistaService.getAnalista()
      .subscribe((data:any) => {
        this.table.items = data
        console.log(data)
      })

  }

  searchdata() {
    let busca: string = `${this.controls.pesquisa.value}=${this.controls.filtro.value}`;
    this.getAnalista(busca);
  }

  getSelected(event) {
    this.constValue.itemSelecionado = event.id;
    console.log(event.id)

  }

  isAnalistaSelected() {
    if (!this.constValue.itemSelecionado) {
      this.notificationService.warning('Selecione um Analista !');
      return false;
    }
    return true;
  }

}
