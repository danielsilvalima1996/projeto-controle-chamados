import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalistaListComponent } from './analist/analista-list/analista-list.component';
import { AnalistaEditComponent } from './analist/analista-edit/analista-edit.component';
import { AnalistaAddComponent } from './analist/analista-add/analista-add.component';


const routes: Routes = [
  { path: '', component: AnalistaListComponent },
  { path: 'edit/:id', component: AnalistaEditComponent },
  { path: 'view/:id', component: AnalistaEditComponent },
  { path: 'add', component: AnalistaAddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastrosRoutingModule { }
