import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemService, RutService, Item, Rut, ItemListRes } from '../../core';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  
  @Input() rutID: string;
  @Input() itemnum: number;
  @Input() uname: string;
  items: Item[];  // items by search
  addForm: FormGroup;

  constructor(
    private itemService: ItemService,
    private rutService: RutService,
    private formBuild: FormBuilder
  ) {}

  ngOnInit() {
    this.addForm = this.formBuild.group(
      { 'item_id': ['', Validators.required],
        'content': [''],
      }
    );
    this.searchItems();
  }

  searchItems() {
    this.itemService.get_list('user', this.uname, 'done', 1)
    .subscribe(
      res => this.items= res.items
    )
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
      res => {},   // pass res up, to parent rut view
      err => console.log(err)
    );
  }
}
