// api for user

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from './api.service';
import { AuthUser } from '../model';

@Injectable()
export class UserService {
  constructor (private apiService: ApiService) {}

  get(uname: string): Observable<AuthUser> {
    return this.apiService.get('/users/' + uname)
      .pipe(map(data => data));
  }
}
