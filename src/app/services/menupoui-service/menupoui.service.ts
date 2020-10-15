import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PoMenuItem } from '@po-ui/ng-components';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginService } from '../authentication/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class MenupouiService {

  private relativeLink: string = 'menupoui';

  constructor(private http: HttpClient, private loginService: LoginService) { }

  public getMenu(): Observable<Array<PoMenuItem>> {
    return this.loginService
      .getUserInformation$
      .pipe(
        map((item) => item.regra.id),
        switchMap((idRegra) => this.http.get(`${environment.url.apirest}/${this.relativeLink}/${idRegra}`))
      ) as Observable<Array<PoMenuItem>>;
  }
}
