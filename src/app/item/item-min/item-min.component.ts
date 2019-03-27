import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../../core';

@Component({
  selector: 'app-item-min',
  templateUrl: './item-min.component.html',
  styleUrls: ['./item-min.component.css']
})
export class ItemMinComponent implements OnInit {

  constructor() {}

  @Input() item: Item;

  ngOnInit() {}

}