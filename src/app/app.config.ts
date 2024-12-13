import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http'; // Importe 'withFetch'
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCSZC9bAuO5uz4JUn8MJqdrDFQjvIvnqMQ",
  authDomain: "dgm-advocacia.firebaseapp.com",
  projectId: "dgm-advocacia",
  storageBucket: "dgm-advocacia.firebasestorage.app",
  messagingSenderId: "74787424671",
  appId: "1:74787424671:web:227fab01c68e9f3e5b95aa"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()), // Configuração para usar 'fetch' no HttpClient
    // Não usa importProvidersFrom, mas agora passa diretamente os provedores
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth())
  ],
};
