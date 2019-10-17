import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalistaListComponent } from './analist/analista-list/analista-list.component';
import { AnalistaEditComponent } from './analist/analista-edit/analista-edit.component';
import { AnalistaAddComponent } from './analist/analista-add/analista-add.component';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';
import { CompanyAddComponent } from './company/company-add/company-add.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserAddComponent } from './users/user-add/user-add.component';
import { RoleListComponent } from './roles/role-list/role-list.component';
import { RoleEditComponent } from './roles/role-edit/role-edit.component';
import { RoleAddComponent } from './roles/role-add/role-add.component';
import { TipoChamadoListComponent } from './tipo-chamado/tipo-chamado-list/tipo-chamado-list.component';
import { TipoChamadoAddComponent } from './tipo-chamado/tipo-chamado-add/tipo-chamado-add.component';
import { TipoChamadoEditComponent } from './tipo-chamado/tipo-chamado-edit/tipo-chamado-edit.component';
import { SubtipoChamadoListComponent } from './subtipo-chamado/subtipo-chamado-list/subtipo-chamado-list.component';
import { SubtipoChamadoAddComponent } from './subtipo-chamado/subtipo-chamado-add/subtipo-chamado-add.component';
import { SubtipoChamadoEditComponent } from './subtipo-chamado/subtipo-chamado-edit/subtipo-chamado-edit.component';


const routes: Routes = [
  {
    path: 'analista', children: [
      { path: '', component: AnalistaListComponent },
      { path: ':action/:id', component: AnalistaEditComponent },
      { path: 'add', component: AnalistaAddComponent }

    ]
  },
  {
    path: 'empresa', children: [
      { path: '', component: CompanyListComponent },
      { path: ':action/:companyId', component: CompanyEditComponent },
      { path: 'add', component: CompanyAddComponent }

    ]
  },
  {
    path: 'user', children: [
      { path: '', component: UserListComponent },
      { path: ':action/:id', component: UserEditComponent },
      { path: 'add', component: UserAddComponent }
    ]
  },
  {
    path: 'role', children: [
      { path: '', component: RoleListComponent },
      { path: 'edit/:id', component: RoleEditComponent },
      { path: 'add', component: RoleAddComponent }
    ]
  },
  {
    path: 'tipo-chamado', children: [
      { path: '', component: TipoChamadoListComponent },
      { path: 'add', component: TipoChamadoAddComponent },
      { path: 'edit/:id', component: TipoChamadoEditComponent },
    ]
  },
  {
    path: 'subtipo-chamado', children: [
      { path: '', component: SubtipoChamadoListComponent },
      { path: 'add', component: SubtipoChamadoAddComponent },
      { path: 'edit/:id', component: SubtipoChamadoEditComponent },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastrosRoutingModule { }
