// auth

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CanActivate } from '@angular/router';
import { Observable,  BehaviorSubject,  ReplaySubject } from 'rxjs';
import { map, take, distinctUntilChanged } from 'rxjs/operators';

import { ApiService } from './api.service';
import { User, Auth, AuthUser } from '../model';

@Injectable()
export class AuthService {
  private actUserSubject = new BehaviorSubject<User>({} as User);
  public actUser = this.actUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthedSubject = new ReplaySubject<boolean>(1);
  public isAuthed = this.isAuthedSubject.asObservable();

  constructor (
    private apiService: ApiService,
    private http: HttpClient,
  ) {}

  signUp(user: Auth): Observable<any> {
    return this.apiService.post('/signup', user)
    .pipe(map(data => data));
  }

  signIn(user: Auth): Observable<User> {
    return this.apiService.post('/signin', user)
    .pipe(map(data => {
        this.setAuth(data.user);
        return data;
      }
    ));
  }

  toAuth(type: string, user: Auth): Observable<any> {
    return (type === 'signin') 
      ? this.signIn(user)
      : this.signUp(user)
  }

  setAuth(user: AuthUser) {
    // Save JWT sent from server in localstorage
    this.setToken(user.token);
    // Set current user data into observable
    this.actUserSubject.next(user.user);
    // Set isAuthenticated to true
    this.isAuthedSubject.next(true);
  }

  delAuth() {
    // Remove JWT from localstorage
    this.delToken();
    // Set current user to an empty object
    this.actUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthedSubject.next(false);
  }

  getToken(): String {
    return window.localStorage['jwtToken'];
  }

  setToken(token: String) {
    window.localStorage['jwtToken'] = token;
  }

  delToken() {
    window.localStorage.removeItem('jwtToken');
  }
}


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthed.pipe(take(1));
  }
}
