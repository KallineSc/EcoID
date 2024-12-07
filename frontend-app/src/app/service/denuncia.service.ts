import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Denuncia } from '../api/denuncia';

@Injectable()
export class DenunciaService {

    private apiUrl = 'http://localhost:8081/denuncias/';
    
    constructor(private http: HttpClient) { }
    
    getDenuncias() {
        const body = { };
        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);
    
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        if (accessToken) {
            headers = headers.set('Authorization', `Bearer ${accessToken}`);
        }

        return this.http.get<any>(`${this.apiUrl}`, { headers })
            .toPromise()
            .then(res => res.denuncias as Denuncia[]) 
            .then(data => data); 
    }

    // getDenunciasMixed() {
    //     return this.http.get<any>('assets/data/denuncias-mixed.json')
    //         .toPromise()
    //         .then(res => res.data as Denuncia[])
    //         .then(data => data);
    // }

    // getDenunciasWithOrdersSmall() {
    //     return this.http.get<any>('assets/data/denuncias-orders-small.json')
    //         .toPromise()
    //         .then(res => res.data as Denuncia[])
    //         .then(data => data);
    // }
}
