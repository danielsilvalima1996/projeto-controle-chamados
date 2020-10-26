import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { PoChartModule, PoContainerModule, PoDividerModule, PoLoadingModule, PoPageModule, PoWidgetModule } from '@po-ui/ng-components';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PoPageModule,
    PoContainerModule,
    PoWidgetModule,
    PoLoadingModule,
    PoDividerModule,
    PoChartModule
  ]
})
export class HomeModule { }
