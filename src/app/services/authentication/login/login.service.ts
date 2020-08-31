import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { Login, LoginRetorno } from 'src/app/interfaces/login.model';
import { User } from 'src/app/interfaces/user.model';
import { Router } from '@angular/router';
import { AccountCredentials } from 'src/app/interfaces/accountCredentials.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private relativeLink = 'login';
  private isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private userInfo$: BehaviorSubject<LoginRetorno> = new BehaviorSubject<LoginRetorno>(null);

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  get getIsLogged$() {
    const token = sessionStorage.getItem('token');
    if (!token) {
      this.isLoggedIn$.next(false);
    } else {
      this.isLoggedIn$.next(true);
    }
    return this.isLoggedIn$.asObservable();
  }

  setIsLogged$(isLogged) {
    this.isLoggedIn$.next(isLogged);
  }

  get getUserInformation$() {
    const user: LoginRetorno = JSON.parse(sessionStorage.getItem('user'));
    this.userInfo$.next(user);
    return this.userInfo$.asObservable();
  }

  setUserInformation$(user) {
    this.userInfo$.next(user);
  }

  logout() {
    sessionStorage.clear();
    this.isLoggedIn$.next(false);
    this.router.navigate(['login']);
  }


  login(credentials: AccountCredentials): Observable<Login> {
    return this.http.post(`${environment.url.apirest}/${this.relativeLink}`, credentials) as Observable<Login>;
  }

  getVersion() {
    return this.http.get('assets/VERSION', { responseType: 'text' })
  }

}
