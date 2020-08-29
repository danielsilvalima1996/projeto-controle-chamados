import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'cadastros', loadChildren: () => import('./cadastros/cadastros.module').then(m => m.CadastrosModule) },
  { path: 'chamados', loadChildren: () => import('./chamados/chamados.module').then(m => m.ChamadosModule) },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'testing', loadChildren: () => import('./testing/testing.module').then(m => m.TestingModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
