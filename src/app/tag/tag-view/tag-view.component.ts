import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Title } from '@angular/platform-browser';
import { Tag, TagRes, TagService, AuthService } from '../../core';

@Component({
  selector: 'app-tag-view',
  templateUrl: './tag-view.component.html',
  styleUrls: ['./tag-view.component.css']
})
export class TagViewComponent implements OnInit {

  canUpdate: Boolean;
  tagForm: FormGroup;
  tag: Tag;
  tname: string;  // current tag
  relatedTags: string[];
  toEdit: boolean = false;
  followStatus: string = 'Follow';

  ifShowMore: boolean;
  moreOrLessLabel: string;

  constructor( 
    private route: ActivatedRoute,
    private title: Title,
    private formBuild: FormBuilder,
    private authService: AuthService,
    private tagService: TagService,
  ) {}

  ngOnInit() {
    // Retreive the prefetched data
    this.route.data.subscribe((data: { res: TagRes }) => {
      this.tag = data.res.tag;
      this.tname = this.tag.tname;
      const pname = this.tag.pname;
      if (pname) { 
        this.get_related_tags(this.tag.pname); 
      } else {
        this.relatedTags = [];
      }
      this.title.setTitle('#' + this.tag.tname + ' - RutHub');
      this.authService.checkAuth();
      this.authService.isAuthed$.subscribe(auth => {
        this.canUpdate = auth;
        if (auth) { this.checkFollow();}
      });
      // for show more or less tag descript
      this.ifShowMore = this.tag.intro.length > 256;
      this.showLabel();
    }); 
  }

  get_related_tags(pname: string) {
    this.tagService.get_list('tag', pname).subscribe(
      res => { 
        this.relatedTags = res.tags.filter( t => t !== this.tname);
        this.relatedTags.push(pname);
      }
    )
  }

  onShowEdit() {
    this.toEdit = !this.toEdit;
  }

  onToEdit () {
    if (!this.canUpdate) {
      alert('Need To Log in');
      return;
    }
    this.onShowEdit();
    this.tagForm = this.formBuild.group(
      { 'tname': [this.tag.tname],
        'logo': [this.tag.logo || ''],
        'pname': [this.tag.pname || ''],
        'intro': [this.tag.intro || ''],
      }
    );
  }

  onUpdate() {
    if (!this.canUpdate) return;

    const tag_up = this.tagForm.value;

    if (this.tagForm.invalid || !this.canUpdate ) {
      alert("Invalid Input");
      return;
    }
    this.tagService.update(tag_up, this.tag.tname)
    .subscribe(
      res => {
        this.tag = res.tag;
        this.toEdit = false;
        this.tagForm.reset();
      },
      //err => console.log(err)
    );
  }

  checkFollow() {
    if (!this.canUpdate) return;
    this.tagService.checkFollow(this.tname).subscribe(
      res => this.followStatus = res.message === 'star' ? 'unFollow' : 'Follow'
    );
  }

  onFoOrUnFo() {
    if (!this.canUpdate) return;
    const action = this.followStatus === 'Follow' ? 1 : 0;
    this.tagService.follow(this.tname, action).subscribe(
      res => { 
        res.message === 'star' ? 'unFollow' : 'Follow';
        this.checkFollow();
      }
    );
  }

  // for show more or less tag descript
  showMoreOrLess() {
    this.ifShowMore = !this.ifShowMore;
    this.showLabel();
  }
  // for show more or less tag descript
  showLabel() {
    this.moreOrLessLabel = this.ifShowMore ? '...More' : '...Less';
  }

}
