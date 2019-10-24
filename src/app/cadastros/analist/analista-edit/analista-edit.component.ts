import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoNotificationService } from '@portinari/portinari-ui';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AnalistaService } from 'src/app/services/cadastros/analista/analista.service';
import { UtilService } from 'src/app/services/utils/util-service/util.service';
import { Analista } from 'src/app/interfaces/analista.model';

@Component({
  selector: 'app-analista-edit',
  templateUrl: './analista-edit.component.html',
  styleUrls: ['./analista-edit.component.css']
})
export class AnalistaEditComponent implements OnInit {

  page = {
    title: 'Editar Analista',
    actions: [
      { label: 'Salvar', disabled: true, action: () => { this.saveAnalista(this.editAnalistaForm.value) } },
      { label: 'Voltar', icon: 'po-icon po-icon-arrow-left', action: () => { (this.location.back()) } },
    ],
    breadcrumb: {
      items: [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Analistas' },
        { label: 'Editar Analista' }
      ]
    },
    statusOptions: [
      { label: 'ATIVO', value: true },
      { label: 'INATIVO', value: false }
    ]

  }

  constValue = {
    analistaId: '',
  }

  editAnalistaForm: FormGroup = this.fb.group({
    id: [''],
    nome: [''],
    email: [''],
    matricula: [''],
    ativo: ['', [Validators.required]],
    criado: [''],
    modificado: ['']

  })

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private analistaService: AnalistaService,
    private notification: PoNotificationService,
  ) { }

  ngOnInit() {
    this.editAnalistaForm.valueChanges.subscribe((_) => {
      this.page.actions[0].disabled = this.editAnalistaForm.invalid;
    })
    this.route.paramMap
      .subscribe((params: ParamMap) => {
        this.constValue.analistaId = params.get('id');
      })
      this.findById(this.constValue.analistaId)
  }

  get controls() {
    return this.editAnalistaForm.controls;
  }


  private findById(id) {
    this.analistaService
      .findById(id)
      .subscribe((data) => {
        console.log(data);
        
        data.criado = new Date(data.criado);
        data.modificado = new Date(data.modificado);
        this.editAnalistaForm.setValue(data);
      })
  }

   saveAnalista(analista: Analista) {
    if (this.editAnalistaForm.invalid) {
      this.notification.warning('Formulário Inválido!');
      return;
    } else {
    this.analistaService
      .alterAnalista(analista)
      .subscribe((data) => {
        this.notification.success('Analista alterado com sucesso!');
        this.location.back();
      },
        (error: any) => {
          this.notification.error('Erro ao salvar analista!');
        })
  }
   }
}
