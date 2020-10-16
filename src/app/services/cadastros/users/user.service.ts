import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { of, Observable, from } from 'rxjs';
import { Pageable } from 'src/app/interfaces/pageable.model';
import { Usuario } from 'src/app/interfaces/usuario.model'
import { TrocarSenha } from 'src/app/interfaces/trocarSenha.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private relativeLink = '/usuario'
  private url = `${environment.url.apirest}${this.relativeLink}`;

  constructor(
    private http: HttpClient
  ) { }

  getUser(parameters?: any): Observable<Array<Usuario>> {
    return this.http.get(`${this.url}?${parameters}`) as Observable<Array<Usuario>>;
  }

  addUser(obj: any) {
    return this.http.post(`${this.url}`, obj);
  }

  findById(id: number): Observable<Usuario> {
    return this.http.get(`${this.url}/${id}`) as Observable<Usuario>;
  }


  alterUser(user: any) {
    return this.http.put(`${this.url}`, user);
  }

  trocarSenha(senhas: TrocarSenha) {
    return this.http.put(`${this.url}/trocarSenha`, senhas);
  }

  findAllEmpresa(id: number): Observable<Usuario[]> {
    return this.http.get(`${this.url}/all/${id}`) as Observable<Usuario[]>;
  }

  //f3 users
  findAllUser(): Observable<Usuario[]> {
    return this.http.get(`${this.url}/all`) as Observable<Usuario[]>;
  }

  verificaUsername(username: string): Observable<boolean> {
    return this.http.get(`${this.url}/verificaUsername/${username}`) as Observable<boolean>;
  }

}