import { Component, Inject, OnInit, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Item, Rut, RutService, AuthService } from '../../core';

@Component({
  selector: 'app-item-sum',
  templateUrl: './item-sum.component.html',
  styleUrls: ['./item-sum.component.css']
})
export class ItemSumComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private rutService: RutService,
    private authService: AuthService,
  ) {}

  @Input() item: Item;

  selectedRutID: string;
  content: string;
  ruts: Rut[];
  uname: string;

  ngOnInit() {}

  checkCan(): boolean {
    let can: boolean;
    this.authService.checkAuth();
    this.authService.actUser.subscribe(user => this.uname = user.uname);
    this.authService.isAuthed.subscribe(auth => can = auth);
    return can
  }

  toAddDialog() {
    if (!this.checkCan()) return;

    this.searchRuts();
    // let dialogRef: MatDialogRef<AddToListDialog>;
    // //console.log(this.ruts);
    // this.rutService.get_list('user', this.uname, 1, 'create')
    // .subscribe(res => {
        
    //   const ruts = res.ruts;
      
    //   console.log(ruts);
    //   dialogRef = this.dialog.open(AddToListDialog, {
    //     width: '450px',
    //     data: {
    //       selectedRutID: this.selectedRutID, 
    //       content: this.content,
    //       ruts: ruts,
    //     }
    //   })
    // })
    const dialogRef = this.dialog.open(AddToListDialog, {
      width: '450px',
      data: {
        selectedRutID: this.selectedRutID, 
        content: this.content,
        ruts: this.ruts,
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      this.selectedRutID = res.selectedRutID;
      this.content = res.content;
    });
  }

  searchRuts() {
    console.log(this.uname);
    this.rutService.get_list('user', this.uname, 1, 'create')
      .subscribe(res => {
        
        this.ruts = res.ruts;
        console.log(this.ruts);
    })
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

  onNoClick(): void {
    this.dialogRef.close();
  }

}
