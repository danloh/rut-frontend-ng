import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ifAuthed: boolean;
  actUname: string;

  ngOnInit() {
    this.authService.checkAuth();
    this.authService.isAuthed$.subscribe(auth => this.ifAuthed = auth);
    this.authService.actUser$.subscribe(user => this.actUname = user.uname);
  }

  onLogOut() {
    this.authService.delAuth();
    this.authService.isAuthed$.subscribe(auth => this.ifAuthed = auth);
  }
}
