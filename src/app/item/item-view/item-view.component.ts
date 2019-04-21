import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Item, ItemRes } from '../../core';

@Component({
  selector: 'app-item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.css']
})
export class ItemViewComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private title: Title
  ) {}

  item: Item;
  itemID: string;

  ngOnInit() {
    // Retreive the prefetched data
    this.route.data.subscribe(
      (data: { res: ItemRes }) => {
        this.item = data.res.item;
        this.itemID = this.item.id;
        // to Load starStatus
      }
    );
    this.title.setTitle(this.item.title + ' - RutHub');
  }

}
