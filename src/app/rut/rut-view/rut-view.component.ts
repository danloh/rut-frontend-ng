import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { 
  Rut, RutRes, Collect, Tag, TagListRes, TagService, ItemService 
} from '../../core';

@Component({
  selector: 'app-rut-view',
  templateUrl: './rut-view.component.html',
  styleUrls: ['./rut-view.component.css']
})
export class RutViewComponent implements OnInit {

  constructor( 
    private route: ActivatedRoute,
    private itemService: ItemService,
    private tagService: TagService
  ) { }

  rutID: string;
  rut: Rut;
  itemIDs: any;  // map
  collects: Collect[];
  tags: Tag[];

  ngOnInit() {
    // Retreive the prefetched data
    this.route.data.subscribe(
      (data: { res: RutRes }) => {
        this.rut = data.res.rut;
        this.rutID = this.rut.id;

        // Load tags, collects for this rut
        this.getCollects();
        this.getItems();
        this.getTags();
      }
    );
  }

  getCollects() {
    this.itemService.get_collects('rut', this.rutID)
      .subscribe(
        res => this.collects = res.collects.sort((a,b) => a.item_order - b.item_order)
      )
  }

  getItems() {
    this.itemIDs = new Map();
    this.itemService.get_list('rut', this.rutID, 'done', 1)
      .subscribe(
        res => res.items.forEach(i => this.itemIDs.set(i.id, i))
      )
  }

  getTags() {
    this.tagService.get_list('rut', this.rutID)
      .subscribe(res => this.tags = res.tags)
  }
}
