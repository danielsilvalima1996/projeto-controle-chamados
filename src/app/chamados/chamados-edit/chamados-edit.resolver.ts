import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SubtipoChamadoService } from 'src/app/services/chamados/subtipo-chamado/subtipo-chamado.service';

@Injectable({ providedIn: 'root' })
export class ChamadosEditResolve implements Resolve<Observable<any>>{

    constructor(private subtipoChamadoService: SubtipoChamadoService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<Observable<any>> | Promise<Observable<any>> {
        return this.subtipoChamadoService.findSubtipoChamado();
    }
}