import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PermissionsService } from 'src/app/services/cadastros/permissions/permissions.service';
import { ChamadosService } from 'src/app/services/chamados/chamados/chamados.service';
import { SubtipoChamadoService } from 'src/app/services/chamados/subtipo-chamado/subtipo-chamado.service';

@Injectable({ providedIn: 'root' })
export class ChamadosEditResolve implements Resolve<Observable<any>>{

    constructor(private subtipoChamadoService: SubtipoChamadoService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<Observable<any>> | Promise<Observable<any>> {
        return this.subtipoChamadoService.findAll();
    }
}