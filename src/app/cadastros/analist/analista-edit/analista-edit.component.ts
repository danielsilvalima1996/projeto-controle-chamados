import { Component, OnInit } from '@angular/core';
import { PoPageDefault } from '@portinari/portinari-ui';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AnalistaService } from 'src/app/services/cadastros/analista/analista.service';

@Component({
  selector: 'app-analista-edit',
  templateUrl: './analista-edit.component.html',
  styleUrls: ['./analista-edit.component.css']
})
export class AnalistaEditComponent implements OnInit {

  page = {
    title: 'Editar Analista',
    actions: [
      { label: 'Salvar', action: () => {}},
      { label:'Voltar', icon:'po-icon po-icon-arrow-left', action: () => {(this.location.back())}},
    ],
    breadcrumb:{
      items: [
        { label:'Home'},
        { label: 'Cadastros' },
        { label: 'Analistas' },
        { label: 'Editar Analista'}
      ]
    },
    statusOptions: [
      { label: 'ATIVO', value: true },
      { label: 'INATIVO', value: false }
    ]

  }

  constValue = {
    analistaId: ''
  }

  editAnalistaForm: FormGroup = this.fb.group({
    id:[''],
    nome: [''],
    email:[''],
    matricula:[''],
    senha: ['', [Validators.minLength(7)]],
    active: ['', [Validators.required]],

  })

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private analistaService: AnalistaService
  ) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe((params: ParamMap) => {
        this.constValue.analistaId = params.get('id');
        console.log(params);
        

        this.analistaService.getAnalista(this.constValue.analistaId)
        .subscribe((data)=>{
          let value = data;
          this.editAnalistaForm.setValue(Object.assign({}, value));

        })


        
      })
  }

}
