import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';

import { AuthService } from '../core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./auth.component.css']
})
export class SigninComponent implements OnInit {
  title: string = 'Sign In';
  authForm: FormGroup;

  preUrl: string;

  constructor(
    private authService: AuthService,
    private location: Location,
    public router: Router,
    private formBuild: FormBuilder
  ) {}

  ngOnInit() {
    // use FormBuilder to create a form group
    this.authForm = this.formBuild.group({
      'uname': [null, [Validators.required]],
      'password': [null, [Validators.required]]
    });
  }

  onLogin() {
    const authdata = this.authForm.value;
    this.authService.signIn(authdata)
    .subscribe(
      _ => this.location.back(), // todo: avoid back to /signup
      err => console.log(err),
    );
  }
}
