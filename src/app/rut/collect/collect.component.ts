import { Component, OnInit, Input } from '@angular/core';
import { Item, Collect } from '../../core';

@Component({
  selector: 'app-collect',
  templateUrl: './collect.component.html',
  styleUrls: ['./collect.component.css']
})
export class CollectComponent implements OnInit {

  constructor() { }

  @Input() collect: Collect;
  @Input() item: Item;

  ngOnInit() {}

}
