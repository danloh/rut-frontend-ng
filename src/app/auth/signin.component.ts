import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { AuthService } from '../core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./auth.component.css']
})
export class SigninComponent implements OnInit {
  title: string = 'Sign In';
  authForm: FormGroup;

  constructor(
    private authService: AuthService,
    private location: Location,
    private formBuild: FormBuilder
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.formBuild.group({
      'uname': [null, [Validators.required]],
      'password': [null, [Validators.required]]
    });
  }

  ngOnInit() {}

  onLogin() {
    const authdata = this.authForm.value;
    this.authService.signIn(authdata)
    .subscribe(
      data => this.location.back(), // once login direct to the page before logged
      err => console.log(err),
    );
  }
}
