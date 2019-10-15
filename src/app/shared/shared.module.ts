import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { PoToolbarModule, PoFieldModule, PoMenuModule, PoButtonModule, PoButtonGroupModule, PoDynamicModule, PoTableModule } from '@portinari/portinari-ui';
import { PoDialogModule } from '@portinari/portinari-ui';
import { PoModalModule } from '@portinari/portinari-ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PaginationComponent
  ],
  imports: [
    CommonModule,
    PoToolbarModule,
    PoDialogModule,
    PoModalModule,
    FormsModule,
    ReactiveFormsModule,
    PoFieldModule,
    PoMenuModule,
    PoButtonModule,
    PoButtonGroupModule,
    ReactiveFormsModule,
    PoDynamicModule,
    PoTableModule
  ],
  exports: [
    PaginationComponent
  ]
})
export class SharedModule { }
