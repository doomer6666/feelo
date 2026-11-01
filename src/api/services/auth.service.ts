import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { BaseUserDto } from '../models/base-user-dto';
import { LoginCreateParams } from '../models/login-create-params';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = import.meta.env.NG_APP_API_URL;

  login(params: LoginCreateParams): Observable<string> {
    return this.http
      .post(`${this.apiUrl}/auth/login`, params, { responseType: 'text' })
      .pipe(tap((token) => localStorage.setItem('token', token)));
  }

  register(dto: BaseUserDto): Observable<string> {
    return this.http.post(`${this.apiUrl}/auth/register`, dto).pipe(
      switchMap(() =>
        this.login({
          email: dto.email,
          password: dto.password,
        }),
      ),
    );
  }
}
