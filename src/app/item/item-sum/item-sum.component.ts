import { Component, Inject, OnInit, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Item, Rut, RutService, ItemService, AuthService } from '../../core';

@Component({
  selector: 'app-item-sum',
  templateUrl: './item-sum.component.html',
  styleUrls: ['./item-sum.component.css']
})
export class ItemSumComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private rutService: RutService,
    private itemService: ItemService,
    private authService: AuthService,
  ) {}

  @Input() item: Item;
  ruts: Rut[];
  uname: string;
  flagStatus: string = 'Options';

  ngOnInit() {
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
    
    this.rutService.get_list('user', this.uname, 1, 'create')
    .subscribe(res => {
      const ruts = res.ruts;
      const dialogRef = this.dialog.open(AddToListDialog, {
        width: '450px',
        data: {
          selectedRutID: '', 
          content: '',
          ruts: ruts,
        }
      });

      dialogRef.afterClosed().subscribe(res => {
        if (!res) return;
        // then add to rut
        let cdata = { 
          rut_id: res.selectedRutID,
          item_id: this.item.id,
          item_order:  1,  // just  a placeholder
          content: res.content,
          uname: this.uname,
        }
        this.rutService.collect(res.selectedRutID, cdata)
        .subscribe(
          res => console.log('Done'), 
          err => console.log(err)
        );
      });
    })
  }
  
  // currently, not use
  searchRuts() {
    console.log(this.uname);
    this.rutService.get_list('user', this.uname, 1, 'create')
      .subscribe(res => {
        this.ruts = res.ruts;
        console.log(this.ruts);
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
        note: 'Love',
        rate: 1, // to do
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (!res) return;
      // then flag
      this.itemService.star(this.item.id, res.flag, res.rate, res.note)
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
  ruts: Rut[];
}

@Component({
  selector: 'add-to-list-dialog',
  templateUrl: 'add-to-list-dialog.html',
})
export class AddToListDialog {
  constructor(
    public dialogRef: MatDialogRef<AddToListDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AddData
  ) {}

  ngOnInit() {}
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
