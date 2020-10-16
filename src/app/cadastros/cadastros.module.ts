import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoAccordionModule, PoAvatarModule, PoButtonModule, PoDividerModule, PoDynamicModule, PoFieldModule, PoLoadingModule, PoModalModule, PoPageModule, PoTableModule } from '@po-ui/ng-components';
import { SharedModule } from '../shared/shared.module';
import { CadastrosRoutingModule } from './cadastros-routing.module';
import { EmpresaEditComponent } from './empresa/empresa-edit/empresa-edit.component';
import { EmpresaListComponent } from './empresa/empresa-list/empresa-list.component';
import { RegrasEditComponent } from './regras/regras-edit/regras-edit.component';
import { RegrasListComponent } from './regras/regras-list/regras-list.component';
import { SubtipoChamadoEditComponent } from './subtipo-chamado/subtipo-chamado-edit/subtipo-chamado-edit.component';
import { SubtipoChamadoListComponent } from './subtipo-chamado/subtipo-chamado-list/subtipo-chamado-list.component';
import { TecnicosEditComponent } from './tecnicos/tecnicos-edit/tecnicos-edit.component';
import { TecnicosListComponent } from './tecnicos/tecnicos-list/tecnicos-list.component';
import { TipoChamadoEditComponent } from './tipo-chamado/tipo-chamado-edit/tipo-chamado-edit.component';
import { TipoChamadoListComponent } from './tipo-chamado/tipo-chamado-list/tipo-chamado-list.component';
import { UsuarioListComponent } from './usuario/usuario-list/usuario-list.component';
import { UsuarioEditComponent } from './usuario/usuario-edit/usuario-edit.component';


@NgModule({
  declarations: [
    TipoChamadoListComponent,
    TipoChamadoEditComponent,
    SubtipoChamadoListComponent,
    SubtipoChamadoEditComponent,
    EmpresaListComponent,
    EmpresaEditComponent,
    RegrasListComponent,
    RegrasEditComponent,
    TecnicosListComponent,
    TecnicosEditComponent,
    UsuarioListComponent,
    UsuarioEditComponent
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
