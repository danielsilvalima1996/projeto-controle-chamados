import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoAccordionModule, PoAvatarModule, PoButtonModule, PoDividerModule, PoDynamicModule, PoFieldModule, PoLoadingModule, PoModalModule, PoPageModule, PoTableModule } from '@po-ui/ng-components';
import { SharedModule } from '../shared/shared.module';
import { CadastrosRoutingModule } from './cadastros-routing.module';
import { EmpresaAddComponent } from './empresa/empresa-add/empresa-add.component';
import { EmpresaEditComponent } from './empresa/empresa-edit/empresa-edit.component';
import { EmpresaListComponent } from './empresa/empresa-list/empresa-list.component';
import { RegrasEditComponent } from './regras/regras-edit/regras-edit.component';
import { RegrasListComponent } from './regras/regras-list/regras-list.component';
import { SubtipoChamadoAddComponent } from './subtipo-chamado/subtipo-chamado-add/subtipo-chamado-add.component';
import { SubtipoChamadoEditComponent } from './subtipo-chamado/subtipo-chamado-edit/subtipo-chamado-edit.component';
import { SubtipoChamadoListComponent } from './subtipo-chamado/subtipo-chamado-list/subtipo-chamado-list.component';
import { TecnicosEditComponent } from './tecnicos/tecnicos-edit/tecnicos-edit.component';
import { TecnicosListComponent } from './tecnicos/tecnicos-list/tecnicos-list.component';
import { TipoChamadoAddComponent } from './tipo-chamado/tipo-chamado-add/tipo-chamado-add.component';
import { TipoChamadoEditComponent } from './tipo-chamado/tipo-chamado-edit/tipo-chamado-edit.component';
import { TipoChamadoListComponent } from './tipo-chamado/tipo-chamado-list/tipo-chamado-list.component';
import { UserAddComponent } from './users/user-add/user-add.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserListComponent } from './users/user-list/user-list.component';


@NgModule({
  declarations: [
    UserEditComponent,
    UserAddComponent,
    UserListComponent,
    TipoChamadoListComponent,
    TipoChamadoAddComponent,
    TipoChamadoEditComponent,
    SubtipoChamadoAddComponent,
    SubtipoChamadoListComponent,
    SubtipoChamadoEditComponent,
    EmpresaListComponent,
    EmpresaAddComponent,
    EmpresaEditComponent,
    RegrasListComponent,
    RegrasEditComponent,
    TecnicosListComponent,
    TecnicosEditComponent
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
