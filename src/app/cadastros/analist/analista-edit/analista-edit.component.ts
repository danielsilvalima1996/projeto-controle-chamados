import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoNotificationService } from '@portinari/portinari-ui';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AnalistaService } from 'src/app/services/cadastros/analista/analista.service';
import { UtilService } from 'src/app/services/utils/util-service/util.service';

@Component({
  selector: 'app-analista-edit',
  templateUrl: './analista-edit.component.html',
  styleUrls: ['./analista-edit.component.css']
})
export class AnalistaEditComponent implements OnInit {

  page = {
    title: 'Editar Analista',
    actions: [
      { label: 'Salvar', disabled: true, action: () => { } },
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
    action: '',
    // relativeLink:'analista-list'
  }

  editAnalistaForm: FormGroup = this.fb.group({
    id: [''],
    nome: [''],
    email: [''],
    matricula: [''],
    senha: ['', [Validators.required, Validators.minLength(7)]],
    ativo: ['', [Validators.required]],
    criado: [''],
    modificado: ['']

  })

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private analistaService: AnalistaService,
    private utilService: UtilService,
    private notification: PoNotificationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.page.actions[0].disabled = this.editAnalistaForm.invalid;
    this.route.paramMap
      .subscribe((params: ParamMap) => {
        this.constValue.action = params.get('action');
        this.constValue.analistaId = params.get('id');

        // this.analistaService.editarAnalista()
        //   .subscribe((data: any) => {
        //     let arr: Array<any> = data;
        //     arr.map((item: any) => {
        //       console.log(item);

        //       let obj = {
        //         id: this.constValue.analistaId,
        //         nome: item.nome,
        //         email: item.email,
        //         matricula: item.matricula,
        //         senha: '',
        //         created: '',
        //         modified: '',
        //         active: item.active
        //       }
        //       // console.log(obj);
        //       this.editAnalistaForm.setValue(obj)


        //     })

        //   })
      })

      this.findById(this.constValue.analistaId)
  }

  private findById(id) {
    this.analistaService
      .findById(id)
      .subscribe((data) => {
        let obj: Object = data;
        
        this.editAnalistaForm.setValue({}, obj);
      })
  }


}
