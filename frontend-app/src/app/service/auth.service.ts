import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

    private apiUrl = 'http://localhost:8081/auth/';
    
    constructor(private http: HttpClient) { }

    login(email: string, senha: string): Observable<any> {
      const body = { email, senha };
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
  
      return this.http.post(this.apiUrl, body, { headers });
    }
}
