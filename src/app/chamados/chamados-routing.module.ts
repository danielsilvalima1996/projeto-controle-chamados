import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChamadosListComponent } from './chamados-list/chamados-list.component';
import { ChamadosEditComponent } from './chamados-edit/chamados-edit.component';
import { ChamadosAddComponent } from './chamados-add/chamados-add.component';
import { ChamadosViewComponent } from './chamados-view/chamados-view.component';
import { ChamadosEditResolve } from './chamados-edit/chamados-edit.resolver';
import { UsuariosResolve } from './chamados-list/usuarios.resolver';
import { TipoChamadoResolve } from './chamados-edit/tipoChamado.resolver';
import { TecnicosResolve } from './chamados-edit/tecnicos.resolver';


const routes: Routes = [
  {
    path: 'chamados/acompanhar-tecnico', children: [
      {
        path: '',
        component: ChamadosListComponent,
        resolve: {
          usuarios: UsuariosResolve
        }
      },
      {
        path: 'add', component: ChamadosAddComponent,
        resolve: {
          usuarios: UsuariosResolve,
          tecnico:TecnicosResolve
        }
      },
      { path: 'view/:id', component: ChamadosViewComponent },
      {
        path: 'edit/:id',
        component: ChamadosEditComponent,
        resolve: {
          subtipo: ChamadosEditResolve,
          tipoChamado: TipoChamadoResolve,
          tecnico:TecnicosResolve
        }
      }
    ]
  },
  {
    path: 'chamados/acompanhar-usuario', children: [
      {
        path: '', component: ChamadosListComponent,
        resolve: {
          usuarios: UsuariosResolve
        }
      },
      {
        path: 'add', component: ChamadosAddComponent,
        resolve: {
          usuarios: UsuariosResolve,
          tecnico:TecnicosResolve
        }
      },
      {
        path: 'view/:id', component: ChamadosViewComponent,
        resolve: {
          usuarios: UsuariosResolve
        }
      },
      {
        path: 'edit/:id', component: ChamadosEditComponent,
        resolve: {
          subtipo: ChamadosEditResolve,
          tipoChamado: TipoChamadoResolve,
          usuarios: UsuariosResolve,
          tecnico:TecnicosResolve
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChamadosRoutingModule { }
