// api for rut

import { Injectable } from '@angular/core';
//import { HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from './api.service';
import { 
  RutRes, MsgRes, RutListRes, NewRut, UpdateRut, TagRut, NewCollect, CollectRes, Collect
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

  get_list(
    per: string, id: string, 
    p: number, f: string, k: string = '', fr: string = ''
  ): Observable<RutListRes> {
    const qry = `?page=${p}&flag=${f}&kw=${k}&fr=${fr}`
    return this.apiService.get('/ruts/' + per + '/' + id + qry)
      .pipe(map(data => data));
  }

  create(rut: NewRut): Observable<RutRes> {
    return this.apiService.post('/ruts', rut)
    .pipe(map(data => data));
  }

  update(rutid: string, rut: UpdateRut): Observable<RutRes> {
    return this.apiService.post('/ruts/' + rutid, rut)
    .pipe(map(data => data));
  }

  collect(rutid: string, item: NewCollect): Observable<CollectRes> {
    return this.apiService.post('/collectitem/' + rutid, item)
    .pipe(map(data => {
        this.collectSubject.next(data.collect)
        return data;
      }
    ));
  }

  star(rutid: string, action: number = 0, note: string = 'Love'): Observable<MsgRes> {
    return this.apiService.get(`/starrut/${rutid}/${action}/${note}`)
    .pipe(map(data => data));
  }

  checkStar(rutid: string): Observable<MsgRes> {
    return this.apiService.get(`/ifstarrut/${rutid}`)
    .pipe(map(data => data));
  }

  tagRut(act: string, rutid: string, tag: TagRut): Observable<MsgRes> {
    return this.apiService.post(`/tagr/${act}/${rutid}`, tag)
    .pipe(map(data => data));
  }

}
