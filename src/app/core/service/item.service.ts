// api for item

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from './api.service';
import { 
  NewItem, MsgRes, ItemRes, ItemListRes, CollectsRes, CollectRes, 
  UpdateCollect, StarRes 
} from '../model';

@Injectable()
export class ItemService {

  constructor (private apiService: ApiService) {}

  get(id: string): Observable<ItemRes> {
    return this.apiService.get('/items/' + id)
      .pipe(map(data => data));
  }

  get_list(
    per: string, id: string, 
    p: number, f: string, k: string = '', fr: string = ''
  ): Observable<ItemListRes> {
    let qry = `?page=${p}&flag=${f}&kw=${k}&fr=${fr}`
    return this.apiService.get(
      '/items/' + per + '/' + id + qry
    ).pipe(map(data => data));
  }

  get_list_collects(
    per: string, id: string, 
    p: number = 1, f: string = '', k: string = '', fr: string = ''
  ): Observable<CollectsRes> {
    let qry = `?page=${p}&flag=${f}&kw=${k}&fr=${fr}`
    return this.apiService.get('/collects/' + per + '/' + id + qry )
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

  star(itemid: string, flag: string, rate: number, note: string): Observable<StarRes> {
    return this.apiService.get(`/staritem/${itemid}/${flag}/${rate}/${note}`)
    .pipe(map(data => data));
  }

  checkStar(itemid: string): Observable<StarRes> {
    return this.apiService.get(`/itemflag/${itemid}`)
    .pipe(map(data => data));
  }

  updateCollect(cid: string, cData: UpdateCollect): Observable<CollectRes> {
    return this.apiService.put(`/collects/${cid}`, cData)
    .pipe(map(data => data));
  }

  delCollect(cid: string): Observable<MsgRes> {
    return this.apiService.delete(`/collects/${cid}`)
    .pipe(map(data => data));
  }
}
