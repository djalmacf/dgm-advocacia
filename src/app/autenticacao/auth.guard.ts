import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../autenticacao/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Verifica se o usuário está autenticado
    if (this.authService.isLoggedIn()) {
      return true; // Permite acesso à rota
    }

    // Redireciona para a página de login se não estiver autenticado
    this.router.navigate(['/login']);
    return false;
  }
  
}
