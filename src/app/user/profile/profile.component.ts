import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { 
  User, AuthUser, UserService 
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
    private userService: UserService,
  ) {}

  user: User;
  uname: string;

  ngOnInit() {
    this.route.data.subscribe((data: { res: AuthUser }) => {
      this.user = data.res.user;
      this.uname = this.user.uname;
    });
    this.title.setTitle('Profile of ' + this.uname);
  }
}
