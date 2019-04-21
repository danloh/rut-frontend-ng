import { Component, OnInit, Input } from '@angular/core';
import { Item, Collect, ItemService } from '../../core';

@Component({
  selector: 'app-collect',
  templateUrl: './collect.component.html',
  styleUrls: ['./collect.component.css']
})
export class CollectComponent implements OnInit {

  constructor(
    private itemService: ItemService,
  ) {}

  @Input() collect: Collect;
  @Input() item: Item;
  @Input() uname: string;
  @Input() canEdit: boolean = false;
  showEdit: boolean = false;
  editLable: string = 'Edit';
  collectContent: string = '';

  pt: string;

  ngOnInit() {
    this.collectContent = this.collect.content;
    this.canEdit = this.canEdit && this.uname === this.collect.uname;

    this.pt = this.item.slug || this.item.id;
    console.log(this.pt)

  }

  onShowEdit() {
    this.showEdit = !this.showEdit;
    this.editLable = this.showEdit ? 'Cancel Edit' : 'Edit';
  }

  onUpdate() {
    const cdata = {
      id: this.collect.id,
      content: this.collectContent,
      uname: this.uname,
    };
    this.itemService.updateCollect(this.collect.id, cdata).subscribe(
      res => {
        this.collectContent = res.collect.content;
        this.showEdit = false;
      }
    );
  }

  onDel() {
    let cf = confirm('Are You Sure to Delete?');
    if (!cf) return;
    this.itemService.delCollect(this.collect.id).subscribe(
      res => this.collect = {} as Collect
    );
  }

}
