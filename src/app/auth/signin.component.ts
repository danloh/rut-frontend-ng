import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./auth.component.css']
})
export class SigninComponent implements OnInit {
  title: string = 'Sign In';
  isSubmitting = false;
  authForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuild: FormBuilder
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.formBuild.group({
      'uname': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {}

  onSubmit() {
    this.isSubmitting = true;

    const authdata = this.authForm.value;
    this.authService.signIn(authdata)
    .subscribe(
      data => console.log(data),
      err => this.isSubmitting = false
    );
  }
}
