import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastrosRoutingModule } from './cadastros-routing.module';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanyAddComponent } from './company/company-add/company-add.component';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';
import { AnalistaEditComponent } from './analist/analista-edit/analista-edit.component';
import { AnalistaAddComponent } from './analist/analista-add/analista-add.component';
import { AnalistaListComponent } from './analist/analista-list/analista-list.component';
import { PoPageModule, PoButtonModule, PoTableModule, PoFieldModule, PoLoadingModule, PoDividerModule, PoModalModule, PoDynamicModule } from '@portinari/portinari-ui';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserAddComponent } from './users/user-add/user-add.component';
import { RoleAddComponent } from './roles/role-add/role-add.component';
import { RoleEditComponent } from './roles/role-edit/role-edit.component';
import { RoleListComponent } from './roles/role-list/role-list.component';
import { UserListComponent } from './users/user-list/user-list.component';

@NgModule({
  declarations: [
    CompanyListComponent,
    CompanyAddComponent,
    CompanyEditComponent,
    AnalistaEditComponent,
    AnalistaAddComponent,
    AnalistaListComponent,
    UserEditComponent,
    UserAddComponent,
    RoleAddComponent,
    RoleEditComponent,
    RoleListComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    CadastrosRoutingModule,
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
export class CadastrosModule { }
