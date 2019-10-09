import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChamadosListComponent } from './chamados-list/chamados-list.component';
import { ChamadosEditComponent } from './chamados-edit/chamados-edit.component';


const routes: Routes = [
  {
    path: ':tipoChamado', children: [
      { path: '', component: ChamadosListComponent },
      { path: ':action/:id', component: ChamadosEditComponent },
    ]
  },
  // {
  //   path: 'externo', children: [
  //     { path: '', component: ChamadosListComponent },
  //     { path: 'add', component: ChamadosEditComponent }
  //     //      { path: ':action/:id', component: ChamadosEditComponent }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChamadosRoutingModule { }
