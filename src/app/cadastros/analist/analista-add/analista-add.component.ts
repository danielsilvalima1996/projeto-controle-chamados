import { Component, OnInit } from '@angular/core';
import { PoPageAction, PoBreadcrumb, PoBreadcrumbItem, PoNotificationService } from '@portinari/portinari-ui';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { AnalistaService } from 'src/app/services/cadastros/analista/analista.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-analista-add',
  templateUrl: './analista-add.component.html',
  styleUrls: ['./analista-add.component.css']
})
export class AnalistaAddComponent implements OnInit {

  page = {
    actions: <PoPageAction[]>[
      { label: 'Salvar', disabled:true, action: () => { this.addAnalista() } },
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
    ativoOptions: [
      { label: 'ATIVO', value: true },
      { label: 'INATIVO', value: false }
    ]
  }

  analistAddForm: FormGroup = this.fb.group({
    nome: ['', [Validators.required, Validators.pattern('^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$'), Validators.minLength(8)]],
    email: ['', [Validators.required]],
    matricula:['',[]],
    ativo: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private analistaService: AnalistaService,
    private notificationService: PoNotificationService
  ) { }

  ngOnInit() {
    this.analistAddForm.valueChanges.subscribe((_) => {
      this.page.actions[0].disabled = this.analistAddForm.invalid;
    })
  }

  addAnalista() {
    this.analistaService.addAnalista(this.analistAddForm.value)
      .subscribe((data) => {
        this.notificationService.success('Analista salvo com Sucesso');
        this.location.back();
      },
        (error: HttpErrorResponse) => {
          this.notificationService.error(error.error.meta.message);
        }
      );
  }
  

}
