import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Base64 } from 'js-base64';
import { ItemService, RutService, Item, Rut, ItemListRes } from '../../core';
import { regUrl } from '../../shared';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  
  @Input() rutID: string;
  @Input() itemnum: number;
  @Input() uname: string;
  @Output() added = new EventEmitter<boolean>();
  items: Item[];  // items by search
  addForm: FormGroup;

  constructor(
    private itemService: ItemService,
    private rutService: RutService,
    private formBuild: FormBuilder
  ) {}

  ngOnInit() {
    this.addForm = this.formBuild.group(
      { 'item_id': [null, [Validators.required]],
        'content': [''],
      }
    );
    this.loadDoneItems();
  }

  loadDoneItems() {
    this.itemService.get_list('user', this.uname, 1, '3')  // 3-done
      .subscribe(res => this.items= res.items)
  }

  onSearch(key: string){
    if ( key.length < 6) return;  // check the keyword length
    const per = regUrl.test(key) ? 'url' : 'uiid';
    const perid = per === 'url' ? Base64.encode(key) : key;
    this.itemService.get_list(per, perid, 1, '3')  // '3' now just a placeholder, todo: search in done item
      .subscribe(res => this.items = res.items)
  }

  onAdd() {
    const c = this.addForm.value;
    const cdata = Object.assign(c, { 
      rut_id: this.rutID,
      item_order: this.itemnum + 1,
      uname: this.uname,
    });

    if (this.addForm.invalid ) {
      alert("Invalid Input");
      return
    }
    this.rutService.collect(this.rutID, cdata)
    .subscribe(
      res => {
        this.added.emit(true);
      },   // pass res up, to parent rut view
      err => console.log(err)
    );
  }
}
