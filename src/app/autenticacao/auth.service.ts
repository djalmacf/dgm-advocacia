import { inject, Injectable } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, updateProfile } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { from, Observable, BehaviorSubject } from "rxjs";

@Injectable ({
    providedIn: 'root'
})

export class AuthService {

    firebaseAuth = inject(Auth)
    router = inject(Router); // Adicionado para navegação

     // BehaviorSubject para emitir o estado de login
    private _isLoggedIn = new BehaviorSubject<boolean>(this.isLoggedIn()); // Inicializa com o estado do login atual
    isLoggedIn$: Observable<boolean> = this._isLoggedIn.asObservable(); // Torna o estado de login observável

    // Lógica para registrar novo usuário no Firebase
    register(email: string, username: string, password: string):Observable<void> {
        const promise = createUserWithEmailAndPassword(
            this.firebaseAuth, 
            email, 
            password,
        ).then((response) => 
            updateProfile(response.user, {displayName: username}),
        );        
        return from(promise);
    }

    // Lógica para fazer login no Firebase
    login(email: string, password: string): Observable<void> {
        const promise = signInWithEmailAndPassword(
            this.firebaseAuth,
            email, 
            password
        ).then(() => {});
        return from(promise);
    }


     // Realiza o logout
     logout(): Observable<void> {
      const promise = signOut(
            this.firebaseAuth).then(() => {
          localStorage.removeItem('authToken'); // Remove o token de autenticação
          this.router.navigate(['/login']); // Redireciona para a página de login
      });
      return from(promise); // Retorna um Observable para permitir subscrição
  }

  // Realiza um teste lógico se o usuário está ou não logado
  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  
  forgetPassword(email: string): Observable<void> {
    const promise = sendPasswordResetEmail(this.firebaseAuth,email).then(() => {});
    return from(promise);
}
  
}