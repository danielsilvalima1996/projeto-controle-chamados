import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresaEditComponent } from './empresa/empresa-edit/empresa-edit.component';
import { EmpresaListComponent } from './empresa/empresa-list/empresa-list.component';
import { RegrasEditComponent } from './regras/regras-edit/regras-edit.component';
import { RegrasListComponent } from './regras/regras-list/regras-list.component';
import { SubtipoChamadoEditComponent } from './subtipo-chamado/subtipo-chamado-edit/subtipo-chamado-edit.component';
import { SubtipoChamadoEditResolve } from './subtipo-chamado/subtipo-chamado-edit/subtipo-chamado-edit.resolver';
import { SubtipoChamadoListComponent } from './subtipo-chamado/subtipo-chamado-list/subtipo-chamado-list.component';
import { TecnicosEditComponent } from './tecnicos/tecnicos-edit/tecnicos-edit.component';
import { TecnicosListComponent } from './tecnicos/tecnicos-list/tecnicos-list.component';
import { TipoChamadoEditComponent } from './tipo-chamado/tipo-chamado-edit/tipo-chamado-edit.component';
import { TipoChamadoListComponent } from './tipo-chamado/tipo-chamado-list/tipo-chamado-list.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserListComponent } from './users/user-list/user-list.component';


const routes: Routes = [
  {
    path: 'tecnico', children: [
      { path: '', component: TecnicosListComponent },
      { path: ':view/:id', component: TecnicosEditComponent },
      { path: ':edit/:id', component: TecnicosEditComponent },
      { path: 'add', component: TecnicosEditComponent }
    ]
  },
  {
    path: 'empresa', children: [
      { path: '', component: EmpresaListComponent },
      { path: ':view/:id', component: EmpresaEditComponent },
      { path: ':edit/:id', component: EmpresaEditComponent },
      { path: 'add', component: EmpresaEditComponent }

    ]
  },
  {
    path: 'usuario', children: [
      { path: '', component: UserListComponent },
      { path: ':view/:id', component: UserEditComponent },
      { path: ':edit/:id', component: UserEditComponent },
      { path: 'add', component: UserEditComponent }
    ]
  },
  {
    path: 'regra', children: [
      { path: '', component: RegrasListComponent },
      { path: 'add', component: RegrasEditComponent },
      { path: 'view/:id', component: RegrasEditComponent },
      { path: 'edit/:id', component: RegrasEditComponent },
    ]
  },
  {
    path: 'tipo-chamado', children: [
      { path: '', component: TipoChamadoListComponent },
      { path: 'add', component: TipoChamadoEditComponent },
      { path: 'view/:id', component: TipoChamadoEditComponent },
      { path: 'edit/:id', component: TipoChamadoEditComponent },
    ]
  },
  {
    path: 'subtipo-chamado', children: [
      { path: '', component: SubtipoChamadoListComponent },
      { path: 'add', component: SubtipoChamadoEditComponent },
      { path: 'view/:id', component: SubtipoChamadoEditComponent },
      {
        path: 'edit/:id', component: SubtipoChamadoEditComponent,
        resolve: { tipoChamado: SubtipoChamadoEditResolve }
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastrosRoutingModule { }
