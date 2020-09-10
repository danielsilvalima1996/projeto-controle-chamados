import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagina } from 'src/app/interfaces/pagina.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaginaService {

  private relativeLink = 'pagina';

  constructor(private http: HttpClient) { }

  public findAllPagina(): Observable<Array<Pagina>> {
    return this.http.get(`${environment.url.apirest}/${this.relativeLink}`) as Observable<Array<Pagina>>;
  }
}
