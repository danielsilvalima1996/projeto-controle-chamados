import { UserService } from 'src/app/services/cadastros/users/user.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsuariosResolve implements Resolve<Observable<any>>{

    constructor(private usuariosService: UserService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<Observable<any>> | Promise<Observable<any>> {
        return this.usuariosService.getUser("ativo=true");
    }
}