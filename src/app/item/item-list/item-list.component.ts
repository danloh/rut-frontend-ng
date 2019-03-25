import { Component, OnInit, Input } from '@angular/core';
import { Item, ItemListRes, ItemService } from '../../core';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  constructor(private itemService: ItemService) {}

  @Input() per: string;
  @Input() perid: string;
  @Input() flag: string;

  items: Item[];
  totalCount: number;
  paging: number = 1;

  ngOnInit() {
    this.itemService.get_list(this.per, this.perid, this.flag, this.paging)
    .subscribe((res: ItemListRes) => {
        this.items = res.items;
        this.paging += 1;
      }
    )
  }
}
