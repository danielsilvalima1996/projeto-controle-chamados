import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestingRoutingModule } from './testing-routing.module';
import { TestingComponent } from './testing/testing.component';
import { PoPageModule, PoFieldModule, PoButtonModule } from '@portinari/portinari-ui';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [TestingComponent],
  imports: [
    CommonModule,
    TestingRoutingModule,
    PoPageModule,
    ReactiveFormsModule,
    FormsModule,
    PoFieldModule,
    PoButtonModule
  ]
})
export class TestingModule { }
