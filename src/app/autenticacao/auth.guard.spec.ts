import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AuthGuard} from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow navigation if the user is logged in', () => {
    authService.isLoggedIn.and.returnValue(true); // Simula que o usuário está autenticado

    const result = guard.canActivate();

    expect(result).toBeTrue(); // Deve permitir a navegação
    expect(router.navigate).not.toHaveBeenCalled(); // Não deve redirecionar
  });

  it('should block navigation and redirect if the user is not logged in', () => {
    authService.isLoggedIn.and.returnValue(false); // Simula que o usuário não está autenticado

    const result = guard.canActivate();

    expect(result).toBeFalse(); // Não deve permitir a navegação
    expect(router.navigate).toHaveBeenCalledWith(['/login']); // Deve redirecionar para a rota de login
  });
});