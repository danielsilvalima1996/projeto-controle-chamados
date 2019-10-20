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
import { UserListComponent } from './users/user-list/user-list.component';
import { TipoChamadoListComponent } from './tipo-chamado/tipo-chamado-list/tipo-chamado-list.component';
import { TipoChamadoAddComponent } from './tipo-chamado/tipo-chamado-add/tipo-chamado-add.component';
import { TipoChamadoEditComponent } from './tipo-chamado/tipo-chamado-edit/tipo-chamado-edit.component';
import { SubtipoChamadoAddComponent } from './subtipo-chamado/subtipo-chamado-add/subtipo-chamado-add.component';
import { SubtipoChamadoListComponent } from './subtipo-chamado/subtipo-chamado-list/subtipo-chamado-list.component';
import { SubtipoChamadoEditComponent } from './subtipo-chamado/subtipo-chamado-edit/subtipo-chamado-edit.component';
import { PermissionsListComponent } from './permissions/permissions-list/permissions-list.component';
import { PermissionsAddComponent } from './permissions/permissions-add/permissions-add.component';
import { PermissionsEditComponent } from './permissions/permissions-edit/permissions-edit.component';

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
    UserListComponent,
    TipoChamadoListComponent,
    TipoChamadoAddComponent,
    TipoChamadoEditComponent,
    SubtipoChamadoAddComponent,
    SubtipoChamadoListComponent,
    SubtipoChamadoEditComponent,
    PermissionsListComponent,
    PermissionsAddComponent,
    PermissionsEditComponent
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
