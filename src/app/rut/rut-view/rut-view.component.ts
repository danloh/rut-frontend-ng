import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { 
  Rut, RutRes, Collect, AuthService, RutService, TagService, ItemService 
} from '../../core';
import { regSpecial } from '../../shared';

@Component({
  selector: 'app-rut-view',
  templateUrl: './rut-view.component.html',
  styleUrls: ['./rut-view.component.css']
})
export class RutViewComponent implements OnInit {

  constructor( 
    private route: ActivatedRoute,
    private router: Router,
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
  itemIDs: any;  // map {itemID: {Item}}
  collects: Collect[];
  tags: string[];
  
  isAuthed: Boolean;
  canEdit: Boolean;
  uname: string;   // act user

  showAddItem: Boolean = false;
  addLabel: string = 'Add Item';
  starStatus: string = 'Star';
  showAddTag: boolean = false;
  newTag: string = '';

  ngOnInit() {
    // Retreive the prefetched data
    this.route.data.subscribe((data: { res: RutRes }) => {
      this.rut = data.res.rut;
      this.rutID = this.rut.id;
      this.rutUrl = this.rut.url;
      this.itemCount = this.rut.item_count;

      // Load tags, collects for this rut
      this.getItems();
      this.getCollects();
      this.getTags();
      // set docment title
      this.title.setTitle(this.rut.title + ' - RutHub');
      // check auth
      this.authService.checkAuth();
      this.authService.actUser$.subscribe(user => this.uname = user.uname);
      this.authService.isAuthed$.subscribe(auth => {
        this.isAuthed = auth;
        this.canEdit = auth && this.uname === this.rut.uname;
        if (auth) { this.checkStar();}
      });
    });
  }

  getCollects() {
    this.itemService.get_list_collects('rut', this.rutID)
    .subscribe(
      // sort collect per item_order, no order in Item
      res => this.collects = res.collects.sort((a,b) => a.item_order - b.item_order)
    )
  }

  getItems() {
    this.itemIDs = new Map();
    this.itemService.get_list('rut', this.rutID, 1, 'done')
    .subscribe(
      // build a itenID-Item key-value map
      res => res.items.forEach(i => this.itemIDs.set(i.id, i))
    )
  }

  getTags() {
    this.tagService.get_list('rut', this.rutID)
    .subscribe(res => this.tags = res.tags)
  }

  onShowAddItem() {
    if (!this.canEdit) return;

    this.showAddItem = !this.showAddItem;
    this.addLabel = this.showAddItem ? 'Cancel Add Item' : 'Add Item';
  }
  
  afterAdded() {
    //this.rutService.addCollect.subscribe(c => this.collects.push(c));
    this.getCollects();
    this.getItems();
    this.showAddItem = false;
    this.addLabel = 'Add Item';
  }

  checkStar() {
    if (!this.isAuthed) return;
    this.rutService.checkStar(this.rutID).subscribe(
      res => this.starStatus = res.message === 'star' ? 'Unstar' : 'Star'
    );
  }

  onStarOrUnstar() {
    if (!this.isAuthed) {
      alert('Need To Log in');
      return;
    }

    const action = this.starStatus === 'Star' ? 1 : 0;
    this.rutService.star(this.rutID, action).subscribe(
      res => { 
        res.message === 'star' ? 'Unstar' : 'Star';
        this.checkStar();
      }
    );
  }

  toAddTag() {
    if (!this.isAuthed) {
      alert('Need To Log in');
      //this.router.navigateByUrl('/auth/signin');
      return;
    }
    this.showAddTag = !this.showAddTag;
  }

  addOrDelTag(tag?: string) {
    if (!this.isAuthed) {
      alert('Need To Log in');
      return;
    }
    let act_tags: string[];
    let act: number;
    if (tag) {
      let cf = confirm('Are You Sure to Delete this Tag?');
      if (!cf) return;
      act = 0;
      act_tags = [tag];
    } else {
      const newTgs = this.newTag.trim()
        .split(/[,;:，。；]/)
        .map(t => t.trim().replace(regSpecial, '-'))   // rep special char
        .filter(t => 1 < t.length && t.length <= 42);
      if (newTgs.length <= 0) return; 
      act = 1;
      act_tags = newTgs;
    }
    const tagData = {
      tnames: act_tags,
      rut_id: this.rutID,
      action: act,
    };
    
    this.rutService.tagRut(act, this.rutID, tagData)
    .subscribe(() => {
      this.showAddTag = false;
      if (act === 1) {
        this.tags.push(...act_tags);
      } else if (act === 0) {
        this.tags.splice(this.tags.indexOf(tag), 1);
      }
    });
  }
}
