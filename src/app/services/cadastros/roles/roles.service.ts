import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of, Observable } from 'rxjs';
import { Pageable } from 'src/app/interfaces/pageable.model';
import { Role } from 'src/app/interfaces/role.model';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private relativeLink = '/role';
  private url = `${environment.url.apirest}/${this.relativeLink}`;

  constructor(
    private http: HttpClient
  ) { }

  getRoles(parameters?: any): Observable<Pageable<Role>> {
    // return of(
    //   [
    //     {
    //       "id": "1",
    //       "name": "Admnistrador",
    //       "active": true,
    //       "created": "2019-09-14",
    //       "modified": "2019-09-14"
    //     },
    //     {
    //       "id": "2",
    //       "name": "Analista",
    //       "active":true,
    //       "created": "2019-09-14",
    //       "modified": "2019-09-14"
    //     },
    //   ]
    // )
    return this.http.get(`${environment.url.apirest}${this.relativeLink}?${parameters}`) as Observable<Pageable<Role>>;
  }

  addRoles(obj: any) {
    return this.http.post(`${this.url}`, obj);
  }
}