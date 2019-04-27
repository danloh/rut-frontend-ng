import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { AuthService } from '../core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./auth.component.css']
})
export class SigninComponent implements OnInit {
  
  authForm: FormGroup;

  preUrl: string;

  constructor(
    private authService: AuthService,
    private location: Location,
    public router: Router,
    private route: ActivatedRoute,
    private formBuild: FormBuilder,
    private title: Title
  ) {}

  ngOnInit() {
    // use FormBuilder to create a form group
    this.authForm = this.formBuild.group({
      'uname': [null, [Validators.required]],
      'password': [null, [Validators.required]]
    });
    this.title.setTitle('Log in - RutHub');
  }

  onLogin() {
    const authdata = this.authForm.value;
    this.authService.signIn(authdata)
    .subscribe(
      _ => {
        let redUrl: string;
        this.route.queryParamMap.subscribe(
          (params: any) => redUrl = params.get('redirect')
        );
        if (redUrl) {
          this.router.navigateByUrl(redUrl);
        } else {
          this.location.back();
        }
      }, // avoid back to /signup
      err => console.log(err),
    );
  }
}
