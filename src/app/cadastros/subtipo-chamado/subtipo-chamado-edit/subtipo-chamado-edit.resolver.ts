import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TipoChamadoService } from 'src/app/services/chamados/tipo-chamado/tipo-chamado.service';

@Injectable({ providedIn: 'root' })
export class SubtipoChamadoEditResolve implements Resolve<Observable<any>>{

    constructor(private tipoChamadoService: TipoChamadoService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<Observable<any>> | Promise<Observable<any>> {
        return this.tipoChamadoService.findAll();
    }
}