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
  tname: string;
  relatedTags: Tag[];
  toEdit: boolean = false;
  followStatus: string = 'Follow';

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
      this.relatedTags = []; // to do
    });
    this.title.setTitle('RutHub - #' + this.tag.tname);
    
    this.authService.checkAuth();
    this.authService.isAuthed$.subscribe(auth => {
      this.canUpdate = auth;
      if (auth) { this.checkFollow();}
    });
  }

  onShowEdit() {
    this.toEdit = !this.toEdit;
  }

  onToEdit () {
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
    const tag_up = this.tagForm.value;

    if (this.tagForm.invalid || !this.canUpdate ) {
      alert("Invalid Input");
      return
    }
    this.tagService.update(tag_up, this.tag.tname)
    .subscribe(
      res => {
        this.tag = res.tag;
        this.toEdit = false;
        this.tagForm.reset();
      },
      err => console.log(err)
    );
  }

  checkFollow() {
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

}
