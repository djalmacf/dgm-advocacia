import { HttpClient, withFetch } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../autenticacao/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html', 
  styleUrls: ['./login.component.css'], 
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, ],
})

export class LoginComponent {

  fb = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);
  authService = inject(AuthService)

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  
  errorMessage: string | null = null;

  onSubmit(): void {

    const rawForm = this.form.getRawValue();
    this.authService
    .login(rawForm.email, rawForm.password)
    .subscribe(() => {
      this.router.navigateByUrl('/');
    },
    (error) => { this.errorMessage = error.message; });

  }

}