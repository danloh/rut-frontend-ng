// api for rut

import { Injectable } from '@angular/core';
//import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { RutRes, RutListRes } from '../model';
import { map } from 'rxjs/operators';

@Injectable()
export class RutService {
  constructor (private apiService: ApiService) {}

  get(id: string): Observable<RutRes> {
    return this.apiService.get('/ruts/' + id)
      .pipe(map(data => data));
  }

  get_list(per: string, id: string, p: number, f: string): Observable<RutListRes> {
    return this.apiService.get(
      '/ruts/' + per + '/' + id + `?page=${p}&flag=${f}`
    ).pipe(map(data => data));
  }
}
