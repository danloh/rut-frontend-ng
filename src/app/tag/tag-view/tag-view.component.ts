import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Tag, TagRes } from '../../core';

@Component({
  selector: 'app-tag-view',
  templateUrl: './tag-view.component.html',
  styleUrls: ['./tag-view.component.css']
})
export class TagViewComponent implements OnInit {

  constructor( 
    private route: ActivatedRoute,
    private title: Title
  ) {}

  tag: Tag;
  tname: string;
  relatedTags: Tag[];

  ngOnInit() {
    // Retreive the prefetched data
    this.route.data.subscribe(
      (data: { res: TagRes }) => {
        this.tag = data.res.tag;
        this.tname = this.tag.tname;
        this.relatedTags = []; // to do
      }
    );
    this.title.setTitle('RutHub - #' + this.tag.tname);
  }

}
