import { Component, Inject, OnChanges, Input } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Item, Rut, RutService, ItemService, AuthService } from '../../core';
import { Console } from '@angular/core/src/console';

type FlagType = 'todo' | 'doing' | 'done';  // for flag item

let ModRuts: Rut[] = [];  // as global

@Component({
  selector: 'app-item-sum',
  templateUrl: './item-sum.component.html',
  styleUrls: ['./item-sum.component.css']
})
export class ItemSumComponent implements OnChanges {

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private rutService: RutService,
    private itemService: ItemService,
    private authService: AuthService,
  ) {}

  @Input() item: Item;
  //ruts: Rut[];
  uname: string;
  cover: string;
  flagStatus: string = 'Options';
  flagNote: string = '';
  can: Boolean;

  flagMap = {'todo': 1, 'doing': 2, 'done': 3};
  mapFlag = {'1': 'todo', '2': 'doing', '3': 'done', 'Options': 'Options'};

  ngOnChanges() {
    this.authService.checkAuth();
    this.authService.actUser$.subscribe(user => this.uname = user.uname);
    this.authService.isAuthed$.subscribe(auth => this.can = auth);
    
    if (this.can) {
      this.itemService.checkStar(this.item.id).subscribe(
        res => { 
          this.flagStatus = this.mapFlag[res.message];
          this.flagNote = res.note;
        }
      );
    }
    this.cover = this.item.cover;
  }

  toAddDialog() {
    if (!this.can) {
      alert("Need to Log In");
      return;
    }
    // pre-fetch created ruts, then open dialog
    this.rutService.get_list('user', this.uname, 1, 'create')
    .subscribe(res => {
      const ruts = ModRuts = res.ruts;
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
        const rutID = res.selectedRutID;
        if (!rutID) return;
        // then add to rut
        const cdata = { 
          rut_id: rutID,
          item_id: this.item.id,
          item_order:  1,  // just  a placeholder
          content: res.content,
          uname: this.uname,
        }
        this.rutService.collect(res.selectedRutID, cdata)
        .subscribe(
          res => { 
            const rutid = res.collect.rut_id;
            // alert: the ruts canbe changed in dialog component!!
            // how to sync?
            // currently, via a global rut-list to get selected rut
            const selected = ModRuts.filter(r => r.id === rutid)[0];
            if (!selected) {
              this.router.navigateByUrl('/item/' + this.item.slug);
              return;
            }
            this.router.navigateByUrl('/r/' + selected.slug);
          },
          //err => console.log(err)
        );
      });
    })
  }
  
  toFlagDialog(flag: FlagType) {
    if (!this.can) {
      alert("Need to Log In");
      return;
    }

    const dialogRef = this.dialog.open(FlagItemDialog, {
      width: '350px',
      data: {
        flag: flag,
        note: this.flagNote,
        rate: 0, // to do
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (!res) return;
      // then flag
      const flg = res.flag.toLowerCase();
      this.itemService.star(
        this.item.id, this.flagMap[flg], res.rate, res.note || 'Love'
      )
      .subscribe(
        resp => {
          this.flagStatus = this.mapFlag[resp.message];
          this.flagNote = resp.note;
        },
        //err => console.log(err)
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
  page: number = 1;
  hasMore: boolean = true;

  ngOnInit() {
    this.ruts = this.data.ruts;
    this.hasMore = this.ruts.length === 20;  // maybe has next page
  }

  onSearch(key: string){
    if (key.length < 6) return;
    this.rutService.get_list('key', this.data.uname, 1, 'create', key, 'user')
    // is there a way to sync the new ruts to item-sum?
    // currently golable var
    .subscribe(res => { 
      this.ruts.unshift(...res.ruts);
      ModRuts = this.ruts;
    })
  }

  onLoadMore() {
    if (!this.hasMore) return;
    this.page += 1;
    this.rutService.get_list('user', this.data.uname, this.page, 'create')
    .subscribe(res => {
      const res_ruts = res.ruts
      this.ruts.push(...res_ruts);
      ModRuts = this.ruts;
      if (res_ruts.length < 20 ) {
        this.hasMore = false;
      }
    });
  }
}

// type of inject to flag item dialog
export interface FlagData {
  flag: string;  // todo|doing|done
  note: string;
  rate: number;
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
