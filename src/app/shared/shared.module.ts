import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { PoToolbarModule, PoFieldModule, PoMenuModule, PoButtonModule, PoButtonGroupModule, PoDynamicModule, PoTableModule } from '@po-ui/ng-components';
import { PoDialogModule } from '@po-ui/ng-components';
import { PoModalModule } from '@po-ui/ng-components';
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
