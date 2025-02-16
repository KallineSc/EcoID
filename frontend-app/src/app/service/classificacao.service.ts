import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ClassificacaoService {

    private apiUrl = 'http://localhost:8081/classificacao/';

    constructor(private http: HttpClient) {}
  
    classificarImagem(imagem: File): Observable<any> {
        const accessToken = localStorage.getItem("accessToken");
    
        const formData = new FormData();
        formData.append("imagem", imagem, imagem.name); 
    
        let headers = new HttpHeaders();
        if (accessToken) {
            headers = headers.set("Authorization", `Bearer ${accessToken}`);
        }
    
        return this.http.post<any>(this.apiUrl, formData, { headers });
    }
    
}
