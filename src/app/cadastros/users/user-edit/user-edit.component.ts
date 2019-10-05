import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from 'src/app/services/cadastros/users/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  page = {
    title: 'Editar Usuário',
    actions: [
      { label: 'Salvar', action: () => { } },
      { label: 'Voltar', icon: 'po-icon po-icon-arrow-left', action: () => { (this.location.back()) } },
    ],
    breadcrumb: {
      items: [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Usuários' },
        { label: 'Editar Usuário' }
      ]
    },
    statusOptions: [
      { label: 'ATIVO', value: true },
      { label: 'INATIVO', value: false }
    ],
    regrasOptions: [
      { label: 'ANALISTA', value: '1' },
      { label: 'ADMINISTRADOR', value: '2' },
      { label: 'AUXILIAR', value: '3' }
    ]

  }

  constValue = {
    userId: ''
  }

  editUserForm: FormGroup = this.fb.group({
    id: [''],
    idEmpresa: [''],
    username: [''],
    email: [''],
    senha: ['', [Validators.minLength(7)]],
    regras: [''],
    ativo: ['', [Validators.required]],
    created:[''],
    modified:['']

  })

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService:UserService
  ) { }


  ngOnInit() {
    this.route.paramMap
      .subscribe((params: ParamMap) => {
        this.constValue.userId = params.get('userId');

        this.userService.editUser()
        .subscribe((data: any) => {
          let arr: Array<any> = data;
          arr.map((item: any) => {
            console.log(item);
            
            let obj = {
            id:this.constValue.userId,
            username:item.username,
            email:item.email,
            idEmpresa:item.idEmpresa,
            senha:'',
            created:'',
            modified:'',
            ativo:item.active
            }
            console.log(obj);
            this.editUserForm.setValue(obj)
           
            
          })
  
        })

      })
  }

}
