import { Component,Input, OnInit, OnChanges } from '@angular/core';
import { Item, ItemListRes, ItemService } from '../../core';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnChanges {

  constructor(private itemService: ItemService) {}

  @Input() per: string;
  @Input() perid: string;
  @Input() flag: string;

  items: Item[];
  totalCount: number;
  page: number = 1;
  hasMore: Boolean;

  ngOnChanges() {
    this.itemService.get_list(this.per, this.perid, this.page, this.flag)
    .subscribe((res: ItemListRes) => {
      this.items = res.items;
      this.totalCount = res.count;
      this.checkMore();
    });
  }

  //ngOnInit() {}

  loadMore() {
    this.itemService.get_list(this.per, this.perid, this.page+1, this.flag)
    .subscribe((res: ItemListRes) => {
      this.items.push(...res.items);
      this.checkMore();
      this.page += 1;
    });
  }

  checkMore() {
    this.hasMore = this.items.length < this.totalCount;
  }

}
