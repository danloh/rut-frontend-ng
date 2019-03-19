// Resolve: pre-fetching item data

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ItemService, ItemRes } from '../core';


@Injectable()
export class ItemResolver implements Resolve<ItemRes> {
  constructor(
    private itemService: ItemService,
    private router: Router,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot): Observable<any> {
    let itemid = route.paramMap.get('id');
    return this.itemService.get(itemid)
      .pipe(catchError(() => this.router.navigateByUrl('/')));
  }
}
