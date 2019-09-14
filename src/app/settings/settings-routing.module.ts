import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserAddComponent } from './users/user-add/user-add.component';
import { RoleListComponent } from './roles/role-list/role-list.component';
import { RoleEditComponent } from './roles/role-edit/role-edit.component';
import { RoleAddComponent } from './roles/role-add/role-add.component';


const routes: Routes = [
  {
    path: 'user-list', children: [
      { path: '', component: UserListComponent },
      { path: 'edit:id', component: UserEditComponent },
      { path: 'view:id', component: UserEditComponent },
      { path: 'add', component: UserAddComponent }
    ]
  },
  {
    path: 'role-list', children: [
      { path: '', component: RoleListComponent },
      { path: 'edit:id', component: RoleEditComponent },
      { path: 'view:id', component: RoleEditComponent },
      { path: 'add', component: RoleAddComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
