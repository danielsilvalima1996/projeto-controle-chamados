import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tecnico } from 'src/app/interfaces/tecnico.model';

@Injectable({
  providedIn: 'root'
})
export class TecnicosService {

  private relativeLink = '/tecnico';
  private url = `${environment.url.apirest}${this.relativeLink}`;

  constructor(
    private http: HttpClient
  ) { }

  getTecnico(parameters?: any): Observable<Array<Tecnico>> {
    return this.http.get(`${this.url}?${parameters}`) as Observable<Array<Tecnico>>;
  }

  findById(id: number): Observable<Tecnico> {
    return this.http.get(`${this.url}/${id}`) as Observable<Tecnico>;
  }

  addTecnico(obj: any) {
    return this.http.post(`${this.url}`, obj);
  }

  alterTecnico(tecnico: Tecnico): Observable<Tecnico> {
    return this.http.put(`${this.url}`, tecnico) as Observable<Tecnico>;
  }

}
