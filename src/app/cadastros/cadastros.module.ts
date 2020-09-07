import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastrosRoutingModule } from './cadastros-routing.module';
import { AnalistaEditComponent } from './analist/analista-edit/analista-edit.component';
import { AnalistaAddComponent } from './analist/analista-add/analista-add.component';
import { AnalistaListComponent } from './analist/analista-list/analista-list.component';
import { PoPageModule, PoButtonModule, PoTableModule, PoFieldModule, PoLoadingModule, PoDividerModule, PoModalModule, PoDynamicModule, PoAccordionModule, PoAvatarModule } from '@po-ui/ng-components';
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
import { EmpresaListComponent } from './empresa/empresa-list/empresa-list.component';
import { EmpresaAddComponent } from './empresa/empresa-add/empresa-add.component';
import { EmpresaEditComponent } from './empresa/empresa-edit/empresa-edit.component';
import { SharedModule } from '../shared/shared.module';
import { RegrasListComponent } from './regras/regras-list/regras-list.component';
import { RegrasEditComponent } from './regras/regras-edit/regras-edit.component';

@NgModule({
  declarations: [
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
    PermissionsEditComponent,
    EmpresaListComponent,
    EmpresaAddComponent,
    EmpresaEditComponent,
    RegrasListComponent,
    RegrasEditComponent
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
    SharedModule,
    PoAccordionModule,
    PoAvatarModule

  ]
})
export class CadastrosModule { }
