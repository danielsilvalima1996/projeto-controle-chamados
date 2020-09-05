import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ViaCep } from 'src/app/interfaces/via-cep.model';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {

  private relativeLink = 'viacep';

  constructor(
    private http: HttpClient
  ) { }

  getCep(cep: string): Observable<ViaCep> {
    return this.http.get(`${environment.url.apirest}/${this.relativeLink}/${cep}`) as Observable<ViaCep>;
  }
}
