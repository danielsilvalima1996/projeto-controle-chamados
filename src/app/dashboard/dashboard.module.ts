import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PoPageModule, PoWidgetModule } from '@po-ui/ng-components';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    PoPageModule,
    PoWidgetModule
  ]
})
export class DashboardModule { }
