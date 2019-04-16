import { Component, Inject, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Item, Rut, RutService, ItemService, AuthService } from '../../core';

@Component({
  selector: 'app-item-sum',
  templateUrl: './item-sum.component.html',
  styleUrls: ['./item-sum.component.css']
})
export class ItemSumComponent implements OnInit {

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private rutService: RutService,
    private itemService: ItemService,
    private authService: AuthService,
  ) {}

  @Input() item: Item;
  ruts: Rut[];
  uname: string;
  cover: string;
  flagStatus: string = 'Options';

  ngOnInit() {
    this.cover = this.item.cover;
    if (this.checkCan()) {
      this.itemService.checkStar(this.item.id).subscribe(
        res => this.flagStatus = res.message
      );
    }
  }

  checkCan(): boolean {
    let can: boolean;
    this.authService.checkAuth();
    this.authService.actUser$.subscribe(user => this.uname = user.uname);
    this.authService.isAuthed$.subscribe(auth => can = auth);
    return can
  }

  toAddDialog() {
    if (!this.checkCan()) {
      alert("Need to Log In");
      return;
    }
    // pre-fetch created ruts, then open dialog
    this.rutService.get_list('user', this.uname, 1, 'create')
    .subscribe(res => {
      const ruts = res.ruts;
      const dialogRef = this.dialog.open(AddToListDialog, {
        width: '550px',
        data: {
          selectedRutID: null, // but required
          content: '',
          uname: this.uname,
          ruts: ruts,
        }
      });

      dialogRef.afterClosed().subscribe(res => {
        if (!res) return;
        let rutID = res.selectedRutID;
        if (!rutID) return;
        // then add to rut
        let cdata = { 
          rut_id: rutID,
          item_id: this.item.id,
          item_order:  1,  // just  a placeholder
          content: res.content,
          uname: this.uname,
        }
        this.rutService.collect(res.selectedRutID, cdata)
        .subscribe(
          res => this.router.navigateByUrl('/r/' + res.collect.rut_id), 
          err => console.log(err)
        );
      });
    })
  }
  
  toFlagDialog(flag: string) {
    if (!this.checkCan()) {
      alert("Need to Log In");
      return;
    }

    const dialogRef = this.dialog.open(FlagItemDialog, {
      width: '350px',
      data: {
        flag: flag,
        note: '',
        rate: 1, // to do
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (!res) return;
      // then flag
      this.itemService.star(this.item.id, res.flag, res.rate, res.note || 'Love')
      .subscribe(
        res => console.log('Done'),
        err => console.log(err)
      );
    });
  }

}

// type of inject to addtolist dialog
export interface AddData {
  selectedRutID: string;
  content: string;
  uname: string;
  ruts: Rut[];
}

@Component({
  selector: 'add-to-list-dialog',
  templateUrl: 'add-to-list-dialog.html',
})
export class AddToListDialog {
  constructor(
    private rutService: RutService,
    public dialogRef: MatDialogRef<AddToListDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AddData
  ) {}

  ruts: Rut[];

  ngOnInit() {
    this.ruts = this.data.ruts;
  }

  onSearch(key: string){
    if (key.length < 6) return;
    this.rutService.get_list('key', this.data.uname, 1, 'create', key, 'user')
    .subscribe(res => { this.ruts = res.ruts;})
  }

}

// type of inject to flag item dialog
export interface FlagData {
  flag: string;  // todo|doing|done
  note: string;
}

@Component({
  selector: 'flag-item-dialog',
  templateUrl: 'flag-dialog.html',
})
export class FlagItemDialog {
  constructor(
    public dialogRef: MatDialogRef<AddToListDialog>,
    @Inject(MAT_DIALOG_DATA) public data: FlagData
  ) {}

  ngOnInit() {}
}
