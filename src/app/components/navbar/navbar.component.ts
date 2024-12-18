import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../autenticacao/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Substitua a assinatura para verificar o estado de login
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn; // Atualiza a variável isLoggedIn com o valor emitido pelo BehaviorSubject
    });
  }

  // Defina o método logout, chamando o serviço de autenticação
  logout(): void {
    this.authService.logout().subscribe(() => {
      console.log('Usuário desconectado');
    });
  }
}
