import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChamadosRoutingModule } from './chamados-routing.module';
import { ChamadosListComponent } from './chamados-list/chamados-list.component';
import { ChamadosAddComponent } from './chamados-add/chamados-add.component';
import { ChamadosEditComponent } from './chamados-edit/chamados-edit.component';


@NgModule({
  declarations: [ChamadosListComponent, ChamadosAddComponent, ChamadosEditComponent],
  imports: [
    CommonModule,
    ChamadosRoutingModule
  ]
})
export class ChamadosModule { }
