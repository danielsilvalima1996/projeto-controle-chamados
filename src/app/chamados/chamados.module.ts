import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChamadosRoutingModule } from './chamados-routing.module';
import { ChamadosListComponent } from './chamados-list/chamados-list.component';
import { ChamadosEditComponent } from './chamados-edit/chamados-edit.component';
import { PoPageModule, PoTableModule, PoFieldModule, PoButtonModule, PoNotificationModule } from '@portinari/portinari-ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChamadosAddComponent } from './chamados-add/chamados-add.component';


@NgModule({
  declarations: [
    ChamadosListComponent,
    ChamadosEditComponent,
    ChamadosAddComponent
  ],
  imports: [
    CommonModule,
    ChamadosRoutingModule,
    PoPageModule,
    PoTableModule,
    FormsModule,
    ReactiveFormsModule,
    PoFieldModule,
    PoButtonModule,
    PoNotificationModule
  ]
})
export class ChamadosModule { }
