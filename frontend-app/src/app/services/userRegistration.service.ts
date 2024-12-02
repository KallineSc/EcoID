import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegistrationResponse } from '../types/user-registration-response.type';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  apiUrl: string = "http://localhost:8081"

  constructor(private httpClient: HttpClient, private route: Router) { }

  userRegistration(nome: string, email: string, senha: string){
    return this.httpClient.post<UserRegistrationResponse>(this.apiUrl + "/usuarios/", { 
      nome,
      email, 
      senha
    }).pipe(
      tap((value) => {
        console.log('Resposta do servidor:', value);
      })
    )
  }

}
