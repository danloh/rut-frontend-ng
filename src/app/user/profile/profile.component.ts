import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { 
  User, AuthUser, AuthService, TagService
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
    private authService: AuthService,
    private tagService: TagService,
  ) {}

  user: User;
  uname: string;
  actname: string;
  tags: string[];
  ifAuthed: Boolean;
  canEditProfile: Boolean;  // important!!

  ngOnInit() {
    this.authService.isAuthed$.subscribe(auth => this.ifAuthed = auth);
    if (!this.ifAuthed) return;
  
    this.authService.actUser$.subscribe(user => this.actname = user.uname);

    this.route.data.subscribe((data: { res: AuthUser }) => {
      this.user = data.res.user;
      this.uname = this.user.uname;
      this.canEditProfile = (this.actname === this.uname) && this.ifAuthed;
    });
    this.tagService.get_list('user', this.uname).subscribe(
      res => this.tags = res.tags
    );
    this.title.setTitle('@' + this.uname + ' - RutHub');
  }
}
