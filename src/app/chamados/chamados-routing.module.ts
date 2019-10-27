import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChamadosListComponent } from './chamados-list/chamados-list.component';
import { ChamadosEditComponent } from './chamados-edit/chamados-edit.component';
import { ChamadosAddComponent } from './chamados-add/chamados-add.component';
import { ChamadosViewComponent } from './chamados-view/chamados-view.component';


const routes: Routes = [
  {
    path: 'interno', children: [
      { path: '', component: ChamadosListComponent },
      { path: 'add', component: ChamadosAddComponent },
      { path: 'view/:id', component: ChamadosViewComponent },
      { path: 'edit/:id', component: ChamadosEditComponent }
    ]
  },
  {
    path: 'externo', children: [
      { path: '', component: ChamadosListComponent },
      { path: 'add', component: ChamadosAddComponent },
      { path: 'view/:id', component: ChamadosViewComponent },
      { path: 'edit/:id', component: ChamadosEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChamadosRoutingModule { }
