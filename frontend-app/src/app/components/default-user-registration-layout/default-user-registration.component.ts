import { Component } from '@angular/core';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class DefaultUserRegistrationLayoutComponent{
  title = 'Cadastro de Usuário';
  primaryBtnText = 'Cadastrar';
  secondaryBtnText = 'Cancelar';
  disablePrimaryBtn = false;
  
  user = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  submit() {
    console.log('Cadastro iniciado');
    // Lógica de envio do formulário de cadastro
  }

  navigate() {
    console.log('Navegando para outra página');
    // Lógica de navegação para outra página
  }

  registerUser() {
    if (this.user.password !== this.user.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
    // Lógica para enviar os dados do formulário para um serviço de backend
    console.log('Usuário registrado:', this.user);
  }
}
