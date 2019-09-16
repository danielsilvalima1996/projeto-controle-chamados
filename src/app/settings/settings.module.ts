import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserAddComponent } from './users/user-add/user-add.component';
import { RoleAddComponent } from './roles/role-add/role-add.component';
import { RoleEditComponent } from './roles/role-edit/role-edit.component';
import { RoleListComponent } from './roles/role-list/role-list.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { PoPageModule, PoButtonModule, PoTableModule, PoFieldModule, PoLoadingModule, PoDividerModule, PoModalModule, PoDynamicModule } from '@portinari/portinari-ui';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [UserEditComponent, UserAddComponent, RoleAddComponent, RoleEditComponent, RoleListComponent, UserListComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    PoPageModule,
    PoButtonModule,
    PoTableModule,
    PoFieldModule,
    PoLoadingModule,
    PoDividerModule,
    PoModalModule,
    PoDynamicModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class SettingsModule { }
