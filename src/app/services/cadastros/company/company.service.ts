import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  
  private relativeLink = 'company';

  constructor(
    private http: HttpClient
  ) { }

  getCompany() {
    return this.http.get(`${environment.url.apirest}/${this.relativeLink}`);
  }
}
