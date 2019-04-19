import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TagService } from '../core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private tagService: TagService,
    private title: Title
  ) {}

  per = 'index';
  perid = 'index';
  action= '0';
  indexTags: String[];

  ngOnInit() {
    this.title.setTitle('Home - RutHub');
    this.tagService.get_list('index', 'index')
      .subscribe(res => this.indexTags = res.tags);
  }
}
