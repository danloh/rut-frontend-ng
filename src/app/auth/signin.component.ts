import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    private router: Router,
    private formBuild: FormBuilder
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.formBuild.group({
      'uname': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {}

  onLogin() {
    const authdata = this.authForm.value;
    this.authService.signIn(authdata)
    .subscribe(
      data => this.router.navigateByUrl('/'),
      err => console.log(err)
    );
  }
}
