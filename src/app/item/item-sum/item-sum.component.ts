import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../../core';

@Component({
  selector: 'app-item-sum',
  templateUrl: './item-sum.component.html',
  styleUrls: ['./item-sum.component.css']
})
export class ItemSumComponent implements OnInit {

  constructor() { }

  @Input() item: Item;

  ngOnInit() {
  }

}
