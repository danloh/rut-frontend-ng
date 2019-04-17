import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { 
  User, AuthUser, UserService, TagService
} from '../../core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private title: Title,
    private tagService: TagService,
  ) {}

  user: User;
  uname: string;
  tags: string[];

  ngOnInit() {
    this.route.data.subscribe((data: { res: AuthUser }) => {
      this.user = data.res.user;
      this.uname = this.user.uname;
    });
    this.tagService.get_list('user', this.uname).subscribe(
      res => this.tags = res.tags
    );
    this.title.setTitle('@' + this.uname + ' - RutHub');
  }
}
