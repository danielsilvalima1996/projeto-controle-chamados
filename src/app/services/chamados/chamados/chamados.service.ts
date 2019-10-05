import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export interface chamados {
  nome: string
}

export class ChamadosService {

  private relativeLink = 'chamados';
  
  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<chamados[]> {
    return this.http.get(`${environment.url.apirest}/${this.relativeLink}`) as Observable<chamados[]>;
  }

  findById(id: number) {
    return this.http.get(`${environment.url.apirest}/${this.relativeLink}/${id}`);
  }

  createChamado()
}
