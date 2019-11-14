import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PermissionsService } from 'src/app/services/cadastros/permissions/permissions.service';

@Injectable({ providedIn: 'root' })
export class UserEditResolve implements Resolve<Observable<any>>{

    constructor(private permissionService: PermissionsService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<Observable<any>> | Promise<Observable<any>> {
        return this.permissionService.findAllActive();
    }
}