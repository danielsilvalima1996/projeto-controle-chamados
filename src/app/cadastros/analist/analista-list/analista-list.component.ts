import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PoTableColumn, PoPageAction, PoBreadcrumb, PoBreadcrumbItem, PoTableAction, PoSelectOption, PoNotificationService } from '@portinari/portinari-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { AnalistaService } from 'src/app/services/cadastros/analista/analista.service';

@Component({
  selector: 'app-analista-list',
  templateUrl: './analista-list.component.html',
  styleUrls: ['./analista-list.component.css']
})
export class AnalistaListComponent implements OnInit {

  page = {
    actions: <PoPageAction[]>[
      { label: 'Novo', icon: 'po-icon po-icon-user-add', url: 'analista-list/add' },
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
      { property: 'active', label: 'Ativo', width: '10%', type:'boolean' }
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
      { label: 'STATUS', value: 'active' }
    ],
    filtro: <PoSelectOption[]>[
      { label: 'SIM', value:'true'},
      { label: 'NÃO', value: 'false'}
    ]
  }

  constValue = {
    itemSelecionado: '',
    analistaId:'',
    input: <Boolean>true,
    select: <Boolean>false
  }

  constructor(
    private fb: FormBuilder,
    private analistaService: AnalistaService,
    private router: Router,
    private notificationService: PoNotificationService,
    private route: ActivatedRoute
  ) { }



  ngOnInit() {
    this.controls.pesquisa
    .valueChanges.subscribe((data) => {
      this.tipoForm(data);
    })
    this.getAnalista()

  }

  get controls() {
    return this.analistaform.controls;
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

   getAnalista() {
    this.analistaService.getAnalistaChumbado()
      .subscribe((data:any) => {
        this.table.items = data
        // console.log(data)
      })

  }

  searchData() {
    let busca: string = `${this.controls.pesquisa.value}=${this.controls.filtro.value}`;
    this.getAnalista();
  }

  getSelected(event) {
    this.constValue.itemSelecionado = event.id;
    // console.log(event.id)
  }

 getUnSelected() {
    this.constValue.itemSelecionado = '';
  }

  isAnalistaSelected() {
    if (!this.constValue.itemSelecionado) {
      this.notificationService.warning('Selecione um Analista !');
      return;
    }
  }

}
