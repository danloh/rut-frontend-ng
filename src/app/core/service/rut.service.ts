// api for rut

import { Injectable } from '@angular/core';
//import { HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from './api.service';
import { 
  RutRes, RutListRes, NewRut, UpdateRut, NewCollect, CollectsRes, Collect
} from '../model';

@Injectable()
export class RutService {

  private collectSubject = new BehaviorSubject<Collect>({} as Collect);
  public addCollect = this.collectSubject.asObservable()

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

  create(rut: NewRut): Observable<RutRes> {
    return this.apiService.post('/ruts', rut)
    .pipe(map(data => data));
  }

  update(rut: UpdateRut, rutid: string): Observable<RutRes> {
    return this.apiService.post('/ruts/' + rutid, rut)
    .pipe(map(data => data));
  }

  collect(rutid: string, item: NewCollect): Observable<CollectsRes> {
    return this.apiService.post('/collectitem/' + rutid, item)
    .pipe(map(data => {
        this.collectSubject.next(data.collect)
        return data;
      }
    ));
  }

}
