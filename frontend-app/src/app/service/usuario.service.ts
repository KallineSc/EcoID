import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../api/usuario';

@Injectable()
export class UsuarioService {

    private apiUrl = 'http://localhost:8081/usuarios/';
    
    constructor(private http: HttpClient) { }
    
    // // Obter usuários (opcionalmente filtrado)
    // getUsuarios() {
    //     const accessToken = localStorage.getItem('accessToken');
    //     console.log('Access Token:', accessToken);
    
    //     let headers = new HttpHeaders().set('Content-Type', 'application/json');
    //     if (accessToken) {
    //         headers = headers.set('Authorization', `Bearer ${accessToken}`);
    //     }
    
    //     return this.http.get<any>(`${this.apiUrl}`, { headers })
    //         .toPromise()
    //         .then(res => res.usuarios as Usuario[]) // Ajuste para sua estrutura de resposta
    //         .catch(error => {
    //             console.error('Erro ao buscar usuários:', error);
    //             throw error;
    //         });
    // }

    getUsuarioById(id: string) {
        const accessToken = localStorage.getItem('accessToken');
        console.log('Access Token:', accessToken);
    
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        if (accessToken) {
            headers = headers.set('Authorization', `Bearer ${accessToken}`);
        }
    
        return this.http.get<any>(`${this.apiUrl}${id}`, { headers })
            .toPromise()
            .then(res => {
                console.log('Usuário obtido com sucesso:', res);
                return res as Usuario; // Converte a resposta no modelo Usuario
            })
            .catch(error => {
                console.error(`Erro ao buscar o usuário com ID ${id}:`, error);
                throw error;
            });
    }
    

    postUsuario(usuario: Usuario) {
        const accessToken = localStorage.getItem('accessToken');
        console.log('Access Token:', accessToken);
    
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        if (accessToken) {
            headers = headers.set('Authorization', `Bearer ${accessToken}`);
        }
    
        return this.http.post<any>(`${this.apiUrl}`, usuario, { headers })
            .toPromise()
            .then(res => {
                console.log('Usuário cadastrado com sucesso!', res);
                return res;
            })
            .catch(error => {
                console.error('Erro ao salvar o usuário', error);
                throw error; 
            });
    }

    updateUsuario(usuario: Usuario) {
        const accessToken = localStorage.getItem('accessToken');
        console.log('Access Token:', accessToken);
    
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        if (accessToken) {
            headers = headers.set('Authorization', `Bearer ${accessToken}`);
        }
    
        return this.http.put<any>(`${this.apiUrl}${usuario.id}`, usuario, { headers })
            .toPromise()
            .then(res => {
                console.log('Usuário atualizado com sucesso!', res);
                return res;
            })
            .catch(error => {
                console.error('Erro ao atualizar o usuário', error);
                throw error; 
            });
    }    

    // // Deletar um usuário
    // deleteUsuario(id: string) {
    //     const accessToken = localStorage.getItem('accessToken');
    //     console.log('Access Token:', accessToken);
    
    //     let headers = new HttpHeaders().set('Content-Type', 'application/json');
    //     if (accessToken) {
    //         headers = headers.set('Authorization', `Bearer ${accessToken}`);
    //     }
    
    //     return this.http.delete<any>(`${this.apiUrl}${id}`, { headers })
    //         .toPromise()
    //         .then(res => {
    //             console.log('Usuário excluído com sucesso!', res);
    //             return res;
    //         })
    //         .catch(error => {
    //             console.error('Erro ao excluir o usuário', error);
    //             throw error; 
    //         });
    // }

}
