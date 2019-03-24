// api for tag

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from './api.service';
import { TagRes, TagListRes } from '../model';


@Injectable()
export class TagService {
  constructor (private apiService: ApiService) {}

  get(id: string): Observable<TagRes> {
    return this.apiService.get('/tags/' + id)
      .pipe(map(data => data));
  }

  get_list(per: string, id: string): Observable<TagListRes> {
    return this.apiService.get('/tags/' + per + '/' + id)
      .pipe(map(data => data));
  }
}
