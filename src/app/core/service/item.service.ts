// api for item

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from './api.service';
import { NewItem, ItemRes, ItemListRes, CollectsRes } from '../model';

@Injectable()
export class ItemService {

  constructor (private apiService: ApiService) {}

  get(id: string): Observable<ItemRes> {
    return this.apiService.get('/items/' + id)
      .pipe(map(data => data));
  }

  get_list(per: string, id: string, f: string, p: number): Observable<ItemListRes> {
    return this.apiService.get(
      '/items/' + per + '/' + id + `?flag=${f}&page=${p}`
    ).pipe(map(data => data));
  }

  get_collects(per: string, id: string): Observable<CollectsRes> {
    return this.apiService.get('/collects/' + per + '/' + id )
      .pipe(map(data => data));
  }

  submit(item: NewItem): Observable<ItemRes> {
    return this.apiService.post('/items', item)
    .pipe(map(data => data));
  }

  update(item: any, itemid: string): Observable<ItemRes> {
    return this.apiService.post('/items/' + itemid, item)
    .pipe(map(data => data));
  }
}
