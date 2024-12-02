import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, FormRecord, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { UserRegistrationService } from '../../services/userRegistration.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

interface UserRegistrationForm {
  username: FormControl,
  email: FormControl,
  password: FormControl,
  confirmPassword: FormControl
}

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent,
    CommonModule
  ],
  providers: [
    UserRegistrationService
  ],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.scss'
})
export class UserRegistrationComponent {
  userRegistrationForm!: FormGroup<UserRegistrationForm>;

  constructor(
    private router: Router,
    private userRegistrationService: UserRegistrationService,
    private toastService: ToastrService
  ){
    this.userRegistrationForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  submit() {

    if (this.userRegistrationForm.invalid) {
      this.userRegistrationForm.markAllAsTouched();
      return;
    }

    if (this.userRegistrationForm.value.password !== this.userRegistrationForm.value.confirmPassword) {
      this.toastService.error('As senhas não coincidem', 'Erro');
      return;
    }
  
    this.userRegistrationService.userRegistration(
      this.userRegistrationForm.value.username, 
      this.userRegistrationForm.value.email, 
      this.userRegistrationForm.value.password
    ).subscribe({
      next: (response) => {
        const successMessage = response?.mensagem || 'Registro realizado com sucesso!';
        this.toastService.success(successMessage, 'Sucesso');
        this.router.navigate(["home"])
      },
      error: (err) => {
        const errorMessage = err.error?.erros || 'Erro desconhecido';
        this.toastService.error(errorMessage, 'Erro');
      }
    });
  }

  hasError(field: string, error: string): boolean {
    return !!this.userRegistrationForm.get(field)?.hasError(error) &&
          !!this.userRegistrationForm.get(field)?.touched;
  }

  navigate(){
    this.router.navigate(["login"])
  }
}
