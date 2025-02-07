import { Component, OnInit} from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';
import { MessageService } from 'primeng/api';
import { Usuario } from 'src/app/api/usuario';

@Component({
    selector: 'app-signIn',
    templateUrl: './signIn.component.html',
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
export class SignInComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  termsAccepted: boolean = false;

  constructor(
    private usuarioService: UsuarioService, 
    private router: Router, 
    private messageService: MessageService
  ) {}

  cadastrarUsuario() {
    if (!this.name || !this.email || !this.password) {
      this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Por favor, preencha todos os campos!'});
      return;
    }

    if (!this.termsAccepted) {
      this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Você precisa aceitar os termos e condições!'});
      return;
    }

    const novoUsuario: Usuario = {
      nome: this.name,
      email: this.email,
      senha: this.password
    };

    this.usuarioService.postUsuario(novoUsuario)
      .then(res => {
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Cadastro realizado com sucesso!'});
        this.router.navigate(['/auth/login']);
      })
      .catch(error => {
        const erros = error?.error?.erros || {};
        Object.keys(erros).forEach(campo => {
          erros[campo].forEach(mensagem => {
            this.messageService.add({
              severity: 'error',
              summary: `Erro no campo ${campo}`,
              detail: mensagem,
              life: 3000
            });
          });
        });
      });
  }
}
