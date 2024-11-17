import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { tap } from 'rxjs';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl: string = "http://localhost:8081"

  constructor(private httpClient: HttpClient, private route: Router) { }

  login(email: string, senha: string){
    return this.httpClient.post<LoginResponse>(this.apiUrl + "/auth/", { email, senha }).pipe(
      tap((value) => {
        sessionStorage.setItem("access_token", value.access_token)
        this.route.navigate([""])
      })
    )
  }

}
