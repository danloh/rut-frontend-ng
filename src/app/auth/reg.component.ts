import { Component, OnInit } from '@angular/core';
import { 
  FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors 
} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../core';
import { regName } from '../shared';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./auth.component.css']
})
export class RegComponent implements OnInit {
  title: string = 'Register';
  regForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuild: FormBuilder
  ) {}

  matchValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const psw = control.get('password');
    const confirm = control.get('confirm');
    return psw && confirm && psw.value === confirm.value 
      ? { 'match': true } 
      : null;
  };

  ngOnInit() {
    // use FormBuilder to create a form group
    this.regForm = this.formBuild.group(
      { 'uname': [null, [Validators.required, Validators.pattern(regName)]],
        'password': [null, [Validators.required]],
        'confirm': [null, [Validators.required]]
      }
      //, {validators: this.matchValidator}
    );
  }

  onReg() {
    const authdata = this.regForm.value;
    const notMatch = authdata.password !== authdata.confirm;
    // custom validation vs  effect on status of form
    // no error, but invalid; error then valid ??
    if (this.regForm.invalid || notMatch ) {
      alert("Invalid Input or Not Match");
      return
    }
    this.authService.signUp(authdata)
    .subscribe(
      data => this.router.navigateByUrl('/signin'),
      err => console.log(err)
    );
  }
}
