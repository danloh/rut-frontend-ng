import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { 
  Rut, RutRes, Collect, AuthService, RutService, TagService, ItemService 
} from '../../core';

@Component({
  selector: 'app-rut-view',
  templateUrl: './rut-view.component.html',
  styleUrls: ['./rut-view.component.css']
})
export class RutViewComponent implements OnInit {

  constructor( 
    private route: ActivatedRoute,
    private title: Title,
    private authService: AuthService,
    private itemService: ItemService,
    private tagService: TagService,
    private rutService: RutService
  ) {}

  rutID: string;
  rut: Rut;
  rutUrl: string;
  itemCount: number;
  itemIDs: any;  // map
  collects: Collect[];
  tags: string[];
  canEdit: Boolean;
  uname: string;   // act user
  showAdd: Boolean = false;
  addLabel: string = 'Add Item';

  ngOnInit() {
    // Retreive the prefetched data
    this.route.data.subscribe((data: { res: RutRes }) => {
      this.rut = data.res.rut;
      this.rutID = this.rut.id;
      this.rutUrl = this.rut.url;
      this.itemCount = this.rut.item_count;

      // Load tags, collects for this rut
      this.getCollects();
      this.getItems();
      this.getTags();
    });
    this.title.setTitle('RutHub - ' + this.rut.title);

    this.authService.checkAuth();
    this.authService.actUser.subscribe(user => this.uname = user.uname);
    this.authService.isAuthed.subscribe(auth => 
      this.canEdit = auth && this.uname === this.rut.uname
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

  onShowAdd() {
    this.showAdd = !this.showAdd;
    this.addLabel = this.showAdd ? 'Cancel Add Item' : 'Add Item';
  }
  
  onAdded() {
    //this.rutService.addCollect.subscribe(c => this.collects.push(c));
    this.getCollects();
    this.getItems();
    this.onShowAdd();
  }
}
