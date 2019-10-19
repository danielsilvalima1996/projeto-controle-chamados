import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { of, Observable, from } from 'rxjs';
import { Pageable } from 'src/app/interfaces/pageable.model';
import { User } from 'src/app/interfaces/user.model'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private relativeLink = '/user'
  private url = `${environment.url.apirest}${this.relativeLink}`;

  constructor(
    private http: HttpClient
  ) { }
  getUser(parameters:any): Observable<Pageable<User>> {
    return this.http.get(`${environment.url.apirest}/${this.relativeLink}?${parameters}`) as Observable<Pageable<User>> ;
  }

  addUser(obj: any) {
    return this.http.post(`${this.url}`, obj);
  }

}