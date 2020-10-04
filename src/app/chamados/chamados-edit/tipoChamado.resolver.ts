import { UserService } from 'src/app/services/cadastros/users/user.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TipoChamadoService } from 'src/app/services/chamados/tipo-chamado/tipo-chamado.service';

@Injectable({ providedIn: 'root' })
export class TipoChamadoResolve implements Resolve<Observable<any>>{

    constructor(private tipoChamadoService: TipoChamadoService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<Observable<any>> | Promise<Observable<any>> {
        return   this.tipoChamadoService.findAll('ativo=true')
    }
}