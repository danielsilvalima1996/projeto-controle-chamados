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


const routes: Routes = [
  {
    path: 'analista-list', children: [
      { path: '', component: AnalistaListComponent },
      { path: ':action/:analistaId', component: AnalistaEditComponent },
      { path: 'add', component: AnalistaAddComponent }

    ]
  },
  {
    path: 'empresa-list', children: [
      { path: '', component: CompanyListComponent },
      { path: ':action/:companyId', component: CompanyEditComponent },
      { path: 'add', component: CompanyAddComponent }

    ]
  },
  {
    path: 'user-list', children: [
      { path: '', component: UserListComponent },
      { path: ':action/:userid', component: UserEditComponent },
      { path: 'add', component: UserAddComponent }
    ]
  },
  {
    path: 'role-list', children: [
      { path: '', component: RoleListComponent },
      { path: ':action/:roleId', component: RoleEditComponent },
      { path: 'add', component: RoleAddComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastrosRoutingModule { }
