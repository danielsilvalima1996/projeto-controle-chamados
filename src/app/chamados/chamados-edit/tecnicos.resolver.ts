import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TecnicosService } from 'src/app/services/cadastros/tecnicos/tecnicos.service';

@Injectable({ providedIn: 'root' })
export class TecnicosResolve implements Resolve<Observable<any>>{

    constructor(private tecnicosService: TecnicosService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<Observable<any>> | Promise<Observable<any>> {
        return this.tecnicosService.getTecnico('ativo=true')
    }
}