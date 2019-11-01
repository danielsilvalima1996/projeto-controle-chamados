import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Pageable } from 'src/app/interfaces/pageable.model';
import { Permission } from 'src/app/interfaces/permission.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  private relativeLink = '/permission';
  private url = `${environment.url.apirest}${this.relativeLink}`;

  private relativeLinkAll = '/permission/all';
  private urlAll = `${environment.url.apirest}${this.relativeLinkAll}`;

  constructor(
    private http: HttpClient
  ) { }

  findAll(parameters?: any): Observable<Pageable<Permission>> {
     return this.http.get(`${this.url}?${parameters}`) as Observable<Pageable<Permission>>;
  }

  findAllActive(): Observable<Permission[]> {
    return this.http.get(`${this.urlAll}`) as Observable<Permission[]>;
 }

  findById(id: number): Observable<Permission> {
    return this.http.get(`${this.url}/${id}`) as Observable<Permission>;
  }

  createPermission(permission: any) {
    return this.http.post(`${this.url}`, permission);
  }

  alterPermission(permission: Permission) {
    return this.http.put(`${this.url}`, permission);
  }


  verificaDescription(description: string): Observable<boolean> {
    return this.http.get(`${this.url}/verificaDescription/${description}`) as Observable<boolean>;
  }
}