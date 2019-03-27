// auth

import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable,  BehaviorSubject,  ReplaySubject } from 'rxjs';
import { map, take, distinctUntilChanged } from 'rxjs/operators';
import * as Cookies from 'js-cookie'

import { ApiService } from './api.service';
import { User, Auth, AuthUser } from '../model';

@Injectable()
export class AuthService {
  private actUserSubject = new BehaviorSubject<User>({} as User);
  public actUser = this.actUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthedSubject = new ReplaySubject<boolean>(1);
  public isAuthed = this.isAuthedSubject.asObservable();

  constructor (private apiService: ApiService) {}

  signUp(user: Auth): Observable<any> {
    return this.apiService.post('/signup', user)
    .pipe(map(data => data));
  }

  signIn(user: Auth): Observable<AuthUser> {
    return this.apiService.post('/signin', user)
    .pipe(map(data => {
        this.setAuth(data);
        return data;
      }
    ));
  }

  setAuth(user: AuthUser) {
    // Save JWT token in cookie
    this.setToken(user.token, user.exp);
    // save user
    this.setID(user.user.uname, user.exp);
    // Set current user data into observable
    this.actUserSubject.next(user.user);
    // Set isAuthenticated to true
    this.isAuthedSubject.next(true);
  }

  checkAuth() {
    let t = this.getToken();
    let u = this.getID();
    if ( Boolean(t) && Boolean(u) ) {
      this.isAuthedSubject.next(true);
      this.actUserSubject.next({uname: u} as User);
    }
  }

  delAuth() {
    // Remove token, ID from cookie
    this.delToken();
    this.delID();
    // Set current user to an empty object
    this.actUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthedSubject.next(false);
  }

  TokenKey: string = 'No-0Is-3SeS-8Nek-0oTr';
  IDKey: string = 'Yt-1IT-7nEdIr-2Sa';

  getToken(): String {
    return Cookies.get(this.TokenKey);
  }

  setToken(token: String, exp: number = 0) {
    Cookies.set(this.TokenKey, token, { expires: exp }); // unit: day
  }

  delToken() {
    return Cookies.remove(this.TokenKey);
  }

  getID (): String {
    return Cookies.get(this.IDKey);
  }
  
  setID (id: string, exp: number = 0) {
    return Cookies.set(this.IDKey, id, { expires: exp });
  }
  
  delID () {
    return Cookies.remove(this.IDKey);
  }
}

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService) {}

  canActivate(): Observable<boolean> {
    this.authService.checkAuth();
    return this.authService.isAuthed.pipe(take(1));
  }
}
