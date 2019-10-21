import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalistaListComponent } from './analist/analista-list/analista-list.component';
import { AnalistaEditComponent } from './analist/analista-edit/analista-edit.component';
import { AnalistaAddComponent } from './analist/analista-add/analista-add.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserAddComponent } from './users/user-add/user-add.component';
import { TipoChamadoListComponent } from './tipo-chamado/tipo-chamado-list/tipo-chamado-list.component';
import { TipoChamadoAddComponent } from './tipo-chamado/tipo-chamado-add/tipo-chamado-add.component';
import { TipoChamadoEditComponent } from './tipo-chamado/tipo-chamado-edit/tipo-chamado-edit.component';
import { SubtipoChamadoListComponent } from './subtipo-chamado/subtipo-chamado-list/subtipo-chamado-list.component';
import { SubtipoChamadoAddComponent } from './subtipo-chamado/subtipo-chamado-add/subtipo-chamado-add.component';
import { SubtipoChamadoEditComponent } from './subtipo-chamado/subtipo-chamado-edit/subtipo-chamado-edit.component';
import { PermissionsListComponent } from './permissions/permissions-list/permissions-list.component';
import { PermissionsEditComponent } from './permissions/permissions-edit/permissions-edit.component';
import { PermissionsAddComponent } from './permissions/permissions-add/permissions-add.component';
import { EmpresaListComponent } from './empresa/empresa-list/empresa-list.component';
import { EmpresaEditComponent } from './empresa/empresa-edit/empresa-edit.component';
import { EmpresaAddComponent } from './empresa/empresa-add/empresa-add.component';


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
      { path: '', component: EmpresaListComponent },
      { path: ':action/:id', component: EmpresaEditComponent },
      { path: 'add', component: EmpresaAddComponent }

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
    path: 'permission', children: [
      { path: '', component: PermissionsListComponent },
      { path: 'edit/:id', component: PermissionsEditComponent },
      { path: 'add', component: PermissionsAddComponent }
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
