import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  authType: string = '';
  title: string = '';
  isSubmitting = false;
  authForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private formBuild: FormBuilder
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.formBuild.group({
      'uname': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'signin' or 'register')
      this.authType = data[data.length - 1].path;
      // Set a title for the page accordingly
      this.title = (this.authType === 'signin') ? 'Sign in' : 'Sign up';
      // add form control for username if this is the register page
      if (this.authType === 'register') {
        this.authForm.addControl('confirm', new FormControl());
      }
    });
  }

  onSubmit() {
    this.isSubmitting = true;

    const authdata = this.authForm.value;
    if (this.authType === 'register') {
      this.authService.signUp(authdata)
      .subscribe(
        data => this.router.navigateByUrl('/signin'),
        err => this.isSubmitting = false
      );
    }
    this.authService.signIn(authdata)
    .subscribe(
      err => this.isSubmitting = false
    );
  }
}
