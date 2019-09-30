import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyListService {

  private relativeLink = 'company';

  constructor(
    private http: HttpClient
  ) { }

  getCompany() {
    return this.http.get(`${environment.url.apirest}/${this.relativeLink}`);
  }
}
