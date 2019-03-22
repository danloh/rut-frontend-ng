import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../core';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./auth.component.css']
})
export class RegComponent implements OnInit {
  title: string = 'Register';
  isSubmitting = false;
  regForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuild: FormBuilder
  ) {
    // use FormBuilder to create a form group
    this.regForm = this.formBuild.group({
      'uname': ['', Validators.required],
      'password': ['', Validators.required],
      'confirm': ['', Validators.required]
    });
  }

  ngOnInit() {}

  onSubmit() {
    this.isSubmitting = true;

    const authdata = this.regForm.value;
    console.log(authdata);
    this.authService.signUp(authdata)
    .subscribe(
      data => this.router.navigateByUrl('/signin'),
      err => this.isSubmitting = false
    );
  }
}
