import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService, User, AuthUser, UserService } from '../../core';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  uname: string;
  ifAuthed: Boolean;
  user: User;

  showUserForm: Boolean = true;
  userForm: FormGroup;
  pswForm: FormGroup;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private formBuild: FormBuilder
  ) {}

  ngOnInit() {
    this.authService.checkAuth();
    this.authService.actUser$.subscribe(user => this.uname = user.uname);
    this.authService.isAuthed$.subscribe(auth => this.ifAuthed = auth);

    this.route.data.subscribe((data: { res: AuthUser }) => {
      this.user = data.res.user;
      this.uname = this.user.uname;
    });

    this.userForm = this.formBuild.group(
      { 'nickname': [this.user.nickname || ''],
        'avatar': [this.user.avatar || ''],
        'email': [this.user.email || ''],
        'location': [this.user.location || ''],
        'intro': [this.user.intro || ''],
      }
    );

    this.pswForm = this.formBuild.group(
      { 'old_psw': [null, [Validators.required]],
        'new_psw': [null, [Validators.required]],
        'confirm': [null, [Validators.required]],
      }
    );
  }

  onSwitch() { this.showUserForm = !this.showUserForm; }

  onUpdate() {
    if (!this.ifAuthed || this.userForm.invalid) {
      alert("Invalid Input");
      return;
    }
    const user_up = this.userForm.value;
    const userData = Object.assign(user_up, { uname: this.uname });
    this.userService.update(this.uname, userData).subscribe(
      res => this.router.navigateByUrl('/p/' + res.user.uname),
      err => console.log(err)
    );
  }

  onChangePsw() {
    const psw = this.pswForm.value;
    const notMatch = psw.new_psw !== psw.confirm;
    if (!this.ifAuthed || this.pswForm.invalid || notMatch) {
      alert("Invalid Input");
      return;
    }
    
    const pswData = Object.assign(psw, { uname: this.uname });
    this.userService.changePsw(this.uname, pswData).subscribe(
      res => this.router.navigateByUrl('/p/' + this.uname),
      err => console.log(err)
    );
  }

}
