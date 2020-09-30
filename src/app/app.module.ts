import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoModule, PoToolbarModule, PoModalModule, PoFieldModule, PoLoadingModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';
import { CadastrosModule } from './cadastros/cadastros.module';
import { ChamadosModule } from './chamados/chamados.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { LoginModule } from './login/login.module';
import { TestingModule } from './testing/testing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorService } from './services/authentication/interceptor/interceptor.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    PoToolbarModule,
    PoModalModule,
    PoFieldModule,
    ReactiveFormsModule,
    FormsModule,
    PoLoadingModule,
    CadastrosModule,
    ChamadosModule,
    DashboardModule,
    LoginModule,
    TestingModule,
    PoModule,
    RouterModule.forRoot([])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
