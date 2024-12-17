import { HttpClient, withFetch } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../autenticacao/auth.service';

@Component({
  selector: 'app-recuperar-senha',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './recuperar-senha.component.html',
  styleUrl: './recuperar-senha.component.css'
})
export class RecuperarSenhaComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);
  authService = inject(AuthService)

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
  });
  
  errorMessage: string | null = null;
  successMessage: string | null = null;

  onSubmit(): void {
    const rawForm = this.form.getRawValue();
    this.authService
      .forgetPassword(rawForm.email)
      .subscribe(
        (success) => {
          // Mensagem de sucesso
          this.successMessage = 'E-mail enviado com sucesso!';
          this.errorMessage = ''; // Limpa mensagem de erro, caso exista
          this.router.navigateByUrl('/home');
        },
        (error) => {
          // Mensagem de erro
          this.errorMessage = 'E-mail inválido.';
          this.successMessage = ''; // Limpa mensagem de sucesso, caso exista
        }
      );
  }
}  
