import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ItemService, AuthService, Item, ItemRes } from '../../core';
import { itemCates } from '../../shared';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css']
})
export class UpdateItemComponent implements OnInit {

  canUpdate: Boolean;
  itemForm: FormGroup;
  item: Item;
  itemID: string;

  cates: string[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,
    private authService: AuthService,
    private formBuild: FormBuilder
  ) {}

  ngOnInit() {
    this.authService.checkAuth();
    
    this.route.data.subscribe((data: { res: ItemRes }) => {
      const res = data.res;
      this.item = res.item;
      this.itemID = this.item.id;
      this.authService.isAuthed$.subscribe(
        auth => this.canUpdate = auth && (res.status === 200)
      );
    });

    if (!this.canUpdate) {
      alert("No Permission");
      return;
    }

    this.cates = itemCates;

    this.itemForm = this.formBuild.group(
      { 'title': [this.item.title, [Validators.required]],
        'uiid': [this.item.uiid || ''],
        'authors': [this.item.authors || '', [Validators.required]],
        'pub_at': [this.item.pub_at || ''],
        'publisher': [this.item.publisher || ''],
        'category': [this.item.category || 'Book'],
        'url': [this.item.url || ''],
        'cover': [this.item.cover || ''],
        'edition': [this.item.edition || ''],
        'detail': [this.item.detail || ''],
      }
    );
  }

  onUpdate() {
    const item_up = this.itemForm.value;
    const itemdata = Object.assign(item_up, { id: this.itemID });
    const either_url_uid = Boolean(item_up.url.trim()) || Boolean(item_up.uiid.trim());

    if (this.itemForm.invalid || !either_url_uid || !this.canUpdate ) {
      alert("Invalid Input");
      return
    }
    this.itemService.update(itemdata, this.itemID)
    .subscribe(
      res => this.router.navigateByUrl('/item/' + res.item.id),
      err => console.log(err)
    );
  }

}
