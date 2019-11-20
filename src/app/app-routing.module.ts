import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'cadastros', loadChildren: './cadastros/cadastros.module#CadastrosModule' },
  { path: 'chamados', loadChildren: './chamados/chamados.module#ChamadosModule' },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
  { path: 'login', loadChildren: './login/login.module#LoginModule' },
  { path: 'testing', loadChildren: './testing/testing.module#TestingModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
