// api for tag

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from './api.service';
import { TagAny, TagRes, TagListRes, MsgRes } from '../model';


@Injectable()
export class TagService {
  constructor (private apiService: ApiService) {}

  get(id: string): Observable<TagRes> {
    return this.apiService.get('/tags/' + id)
      .pipe(map(data => data));
  }

  get_list(
    per: string, id: string,
    p: number = 1, f: string = '', k: string = '', fr: string = ''
  ): Observable<TagListRes> {
    const qry = `?page=${p}&flag=${f}&kw=${k}&fr=${fr}`
    return this.apiService.get(`/tags/${per}/${id}` + qry)
      .pipe(map(data => data));
  }

  update(tag: any, tname: string): Observable<TagRes> {
    return this.apiService.put('/tags/' + tname, tag)
    .pipe(map(data => data));
  }

  follow(tname: string, action: number = 0, note: string = 'Love'): Observable<MsgRes> {
    return this.apiService.get(`/startag/${tname}/${action}/${note}`)
    .pipe(map(data => data));
  }

  checkFollow(tname: string): Observable<MsgRes> {
    return this.apiService.get(`/ifstartag/${tname}`)
    .pipe(map(data => data));
  }

  tagAny(act: number, tag: TagAny): Observable<MsgRes> {
    return this.apiService.post(`/totag/${act}`, tag)
    .pipe(map(data => data));
  }
}
