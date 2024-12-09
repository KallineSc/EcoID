import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Denuncia } from '../api/denuncia';

@Injectable()
export class DenunciaService {

    private apiUrl = 'http://localhost:8081/denuncias/';
    
    constructor(private http: HttpClient) { }
    
    getDenuncias(userId) {
        const accessToken = localStorage.getItem('accessToken');
        console.log('Access Token:', accessToken);
    
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        if (accessToken) {
            headers = headers.set('Authorization', `Bearer ${accessToken}`);
        }
    
        return this.http.get<any>(`${this.apiUrl}`, { headers })
            .toPromise()
            .then(res => {
                const denuncias = res.denuncias as Denuncia[];
                return denuncias.filter(denuncia => denuncia.usuario_id === userId);
            })
            .catch(error => {
                console.error('Erro ao buscar denúncias:', error);
                throw error;
            });
    }

    postDenuncias(denuncia: Denuncia) {
        const accessToken = localStorage.getItem('accessToken');
        console.log('Access Token:', accessToken);
    
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        if (accessToken) {
            headers = headers.set('Authorization', `Bearer ${accessToken}`);
        }
    
        return this.http.post<any>(`${this.apiUrl}`, denuncia, { headers })
            .toPromise()
            .then(res => {
                console.log('Denúncia cadastrada com sucesso!', res);
                return res;
            })
            .catch(error => {
                console.error('Erro ao salvar a denúncia', error);
                throw error; 
            });
    }

    updateDenuncia(denuncia: Denuncia) {
        const accessToken = localStorage.getItem('accessToken');
        console.log('Access Token:', accessToken);
    
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        if (accessToken) {
            headers = headers.set('Authorization', `Bearer ${accessToken}`);
        }
    
        return this.http.put<any>(`${this.apiUrl}${denuncia.id}`, denuncia, { headers })
            .toPromise()
            .then(res => {
                console.log('Denúncia atualizada com sucesso!', res);
                return res;
            })
            .catch(error => {
                console.error('Erro ao atualizar a denúncia', error);
                throw error; 
            });
    }    

    deleteDenuncia(id: string) {
        const accessToken = localStorage.getItem('accessToken');
        console.log('Access Token:', accessToken);
    
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        if (accessToken) {
            headers = headers.set('Authorization', `Bearer ${accessToken}`);
        }
    
        return this.http.delete<any>(`${this.apiUrl}${id}`, { headers })
            .toPromise()
            .then(res => {
                console.log('Denúncia excluída com sucesso!', res);
                return res;
            })
            .catch(error => {
                console.error('Erro ao excluir a denúncia', error);
                throw error; 
            });
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
