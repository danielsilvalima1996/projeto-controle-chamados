import { Component, OnInit } from '@angular/core';
import { PoPageAction, PoBreadcrumb, PoBreadcrumbItem } from '@portinari/portinari-ui';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-analista-add',
  templateUrl: './analista-add.component.html',
  styleUrls: ['./analista-add.component.css']
})
export class AnalistaAddComponent implements OnInit {

  page = {
    actions: <PoPageAction[]>[
      { label: 'Salvar', action: () => { } },
      { label: 'Cancelar', action: () => { this.location.back() } },
    ],

    title: 'Cadastro de Analistas',
    breadcrumb: <PoBreadcrumb>{
      items: <PoBreadcrumbItem[]>[
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Analistas' },
        { label: 'Adicionar Analistas' },
      ]
    },
    statusOptions: [
      { label: 'ATIVO', value: true },
      { label: 'INATIVO', value: false }
    ]
  }

  analistaddForm: FormGroup = this.fb.group({
    nomeAnalista: ['', [Validators.required, Validators.pattern('^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$'), Validators.minLength(10)]],
    emailAnalista: ['', [Validators.required, Validators.pattern('^^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
    senha: ['', [Validators.required,Validators.minLength(7)]],
    matricula:['',[]],
    status: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private location: Location
  ) { }

  ngOnInit() {
    this.analistaddForm.valueChanges.subscribe((_) => {
      this.page.actions[0].disabled = this.analistaddForm.invalid;
    })
  }
  

}
