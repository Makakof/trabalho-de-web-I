import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Login, User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseAPI = environment.URL_BASE + '/auth';
  private readonly http = inject(HttpClient);
  private readonly storageService = inject(StorageService);
  private readonly router = inject(Router);

  private currentUserSubject!: BehaviorSubject<User | null>;
  public currentUser!: Observable<User | null>;

  constructor() {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      this.getUserStorage(false)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(email: string, password: string): Observable<User | null> {
    return this.http
      .post<Login>(this.baseAPI + '/login', {
        email,
        password,
      })
      .pipe(
        switchMap((resp) => {
          if (resp.access_token) {
            const headers = {
              Authorization: `${resp.token_type} ${resp.access_token}`,
            };
            return this.http.get<User>(this.baseAPI + '/me', { headers }).pipe(
              map((user) => {
                user = { ...user, ...resp };
                this.storageService.set('user', user);
                this.currentUserSubject.next(user);
                return user;
              })
            );
          } else {
            return of(null);
          }
        })
      );
  }

  logout(): void {
    this.storageService.remove('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/user/login']);
  }

  getCurrentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    const user = this.getUserStorage(false);

    return !!(user && user.access_token !== null);
  }

  private getUserStorage(isRediret: boolean = true): User | null {
    let user: User | null = null;

    try {
      user = this.storageService.get('user');
    } catch (error) {
      this.logout();
      if (isRediret) {
        this.router.navigate(['/user/login']);
      }
    }

    return user;
  }
}
