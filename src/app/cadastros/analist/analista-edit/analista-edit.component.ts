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
      { label: 'Salvar', disabled:true, action: () => { } },
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
    senha: ['', [Validators.required,Validators.minLength(7)]],
    active: ['', [Validators.required]],
    created: [''],
    modified: ['']

  })

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private analistaService: AnalistaService,
    private utilService: UtilService,
    private notification:PoNotificationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.page.actions[0].disabled = this.editAnalistaForm.invalid;
    this.route.paramMap
      .subscribe((params: ParamMap) => {
        this.constValue.action = params.get('action');
        this.constValue.analistaId = params.get('id');
        // console.log(this.constValue.action);

        this.analistaService.editarAnalista()
        .subscribe((data: any) => {
          let arr: Array<any> = data;
          arr.map((item: any) => {
            console.log(item);
            
            let obj = {
            id:item.id,
            nome:item.nome,
            email:item.email,
            matricula:item.matricula,
            senha:'',
            created:'',
            modified:'',
            active:item.active
            }
            // console.log(obj);
            this.editAnalistaForm.setValue(obj)
           
            
          })
  
        })
      })
  }

  //  updateAnalista() {
  //   let value = this.editAnalistaForm.value;
  //   console.log(value);
    

  //   if (value.name === '') {
  //     this.notification.error('Favor Inserir o nome');
  //     return;
  //     console.log(value.name);
  //   }

  //   if (value.name.length < 3) {
  //     this.notification.warning('Nome precisa ter mais de 3 letras');
  //     return;
  //   } else {
  //     this.analistaService.atualizarAnalista()
  //       .subscribe((data) => {
  //         this.notification.success('User successfully updated');
  //         this.router.navigate([this.constValue.relativeLink]);
  //       },
  //         (error) => {
  //           this.notification.error(error.error.meta.description);
  //         });
  //   }
  // }


}
