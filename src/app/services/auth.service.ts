import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api =
    'https://bb212102-2fab-4fae-9227-3b2b24cf1275.mock.pstmn.io/auth/api/login/';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }) {
    return this.http.post(this.api, credentials).pipe(
      tap((res: any) => {
        localStorage.setItem('user', JSON.stringify(res));
      })
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }

  logout() {
    localStorage.removeItem('user');
  }
}
