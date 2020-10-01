import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChamadosRoutingModule } from './chamados-routing.module';
import { ChamadosListComponent } from './chamados-list/chamados-list.component';
import { ChamadosEditComponent } from './chamados-edit/chamados-edit.component';
import { PoPageModule, PoTableModule, PoFieldModule, PoButtonModule, PoNotificationModule, PoAccordionModule, PoLoadingModule, PoTagModule, PoDividerModule } from '@po-ui/ng-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChamadosAddComponent } from './chamados-add/chamados-add.component';
import { SharedModule } from '../shared/shared.module';
import { ChamadosViewComponent } from './chamados-view/chamados-view.component';


@NgModule({
  declarations: [
    ChamadosListComponent,
    ChamadosEditComponent,
    ChamadosAddComponent,
    ChamadosViewComponent
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
    PoNotificationModule,
    SharedModule,
    PoAccordionModule,
    PoLoadingModule,
    PoTagModule,
    PoDividerModule
  ]
})
export class ChamadosModule { }
