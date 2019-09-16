import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChamadosListComponent } from './chamados-list/chamados-list.component';
import { ChamadosEditComponent } from './chamados-edit/chamados-edit.component';
import { ChamadosAddComponent } from './chamados-add/chamados-add.component';


const routes: Routes = [
  { path: 'interno', component: ChamadosListComponent },
  { path: 'externo', component: ChamadosListComponent },
  { path: ':tipoChamado/:action/:id', component: ChamadosEditComponent },
  { path: 'add', component: ChamadosAddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChamadosRoutingModule { }
