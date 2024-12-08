import { Component, OnInit} from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    email: string = '';
    password: string = '';

    constructor(private authService: AuthService, private router: Router) {}

    onLogin() {
      this.authService.login(this.email, this.password).subscribe(
        (response) => {
          console.log('Login bem-sucedido', response);
          localStorage.setItem('accessToken', response.access_token);
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Erro no login', error);
        }
      );
    }
}
