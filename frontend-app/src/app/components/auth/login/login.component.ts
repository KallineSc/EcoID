import { Component, OnInit} from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    providers: [MessageService],
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

    constructor(private authService: AuthService, private messageService: MessageService, private router: Router) {}

    onLogin() {
      if (!this.email || !this.password) {
        this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Por favor, preencha todos os campos!'});
        return;
      }

      this.authService.login(this.email, this.password).subscribe(
        (response) => {
          localStorage.setItem('accessToken', response.access_token);
          this.router.navigate(['/']);
        },
        (error) => {
          const errorMsg = error?.error?.error || 'Erro desconhecido';
          this.messageService.add({ 
            severity: 'error', 
            summary: 'Erro', 
            detail: `${errorMsg}`, 
            life: 3000 
          });
        }
      );
    }
}
