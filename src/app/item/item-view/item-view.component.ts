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

  ifShowMore: boolean;
  moreOrLessLabel: string;

  ngOnInit() {
    // Retreive the prefetched data
    this.route.data.subscribe((data: { res: ItemRes }) => {
      this.item = data.res.item;
      this.itemID = this.item.id;

      this.ifShowMore = this.item.detail.length > 256;
      this.showLabel();

      // set document title
      this.title.setTitle(this.item.title + ' - RutHub');
    });
  }

  showMoreOrLess() {
    this.ifShowMore = !this.ifShowMore;
    this.showLabel();
  }

  showLabel() {
    this.moreOrLessLabel = this.ifShowMore ? '...More' : '...Less';
  }

}
