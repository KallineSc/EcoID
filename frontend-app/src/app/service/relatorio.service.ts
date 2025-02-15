import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RelatorioService {

  private apiUrl = 'http://localhost:8081/relatorios/denuncias';

  constructor(private http: HttpClient) { }

  generateRelatorio(formato: string): Observable<Blob> {
    const accessToken = localStorage.getItem('accessToken');
        
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    if (accessToken) {
      headers = headers.set('Authorization', `Bearer ${accessToken}`);
    }
    const params = new HttpParams().set('formato', formato);
    return this.http.get(this.apiUrl, { params, responseType: 'blob', headers });
  }
}
