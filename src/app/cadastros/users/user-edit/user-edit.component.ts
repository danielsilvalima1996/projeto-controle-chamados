import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from 'src/app/services/cadastros/users/user.service';
import { RolesService } from 'src/app/services/cadastros/roles/roles.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  page = {
    title: 'Editar Usuário',
    actions: [
      { label: 'Salvar', disabled:true, action: () => { } },
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
    regrasOptions: []

  }

  constValue = {
    id: ''
  }

  editUserForm: FormGroup = this.fb.group({
    id: [''],
    idEmpresa: [''],
    username: [''],
    email: [''],
    senha: ['', [Validators.required,Validators.minLength(7)]],
    regra: ['',[Validators.required]],
    ativo: ['', [Validators.required]],
    created:[''],
    modified:['']

  })

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService:UserService,
    private roleService:RolesService
  ) { }


  ngOnInit() {
    this.page.actions[0].disabled = this.editUserForm.invalid;
    this.roleService.getRoles().subscribe((data: any) => {
      this.page.regrasOptions = data.map((item)=>{
        return { label:item.name, value:item.id}
      })
    })
    
    this.route.paramMap
      .subscribe((params: ParamMap) => {
        this.constValue.id = params.get('id');

        this.userService.editUser()
        .subscribe((data: any) => {
          let arr: Array<any> = data;
          arr.map((item: any) => {
            // console.log(item);
            Object.keys(item).map((data)=>{
              item[data] = item[data];
              console.log(item[data])
            })

            let obj = {
            id:this.constValue.id,
            username:item.username,
            email:item.email,
            idEmpresa:item.idEmpresa,
            regra:item.regra,
            senha:'',
            created:'',
            modified:'',
            ativo:item.ativo
            }
            console.log(obj);
            this.editUserForm.setValue(obj)
           
            
          })
  
        })

      })
  }

}
