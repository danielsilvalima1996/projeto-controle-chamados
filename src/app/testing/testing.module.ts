import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestingRoutingModule } from './testing-routing.module';
import { TestingComponent } from './testing/testing.component';
import { PoPageModule } from '@portinari/portinari-ui';


@NgModule({
  declarations: [TestingComponent],
  imports: [
    CommonModule,
    TestingRoutingModule,
    PoPageModule
  ]
})
export class TestingModule { }
