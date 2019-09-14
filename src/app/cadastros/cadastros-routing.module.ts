import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalistaListComponent } from './analist/analista-list/analista-list.component';
import { AnalistaEditComponent } from './analist/analista-edit/analista-edit.component';
import { AnalistaAddComponent } from './analist/analista-add/analista-add.component';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';
import { CompanyAddComponent } from './company/company-add/company-add.component';


const routes: Routes = [
  {
    path: 'analista-list', children: [
      { path: '', component: AnalistaListComponent },
      { path: 'edit:id', component: AnalistaEditComponent },
      { path: 'view:id', component: AnalistaEditComponent },
      { path: 'add', component: AnalistaAddComponent }

    ]
  },
  {
    path: 'empresa-list', children: [
      { path: '', component: CompanyListComponent },
      { path: 'edit:id', component: CompanyEditComponent },
      { path: 'view:id', component: CompanyEditComponent },
      { path: 'add', component: CompanyAddComponent }

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastrosRoutingModule { }
