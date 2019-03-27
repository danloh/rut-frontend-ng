import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { RutService, AuthService } from '../../core';

@Component({
  selector: 'app-new-rut',
  templateUrl: './new-rut.component.html',
  styleUrls: ['./new-rut.component.css']
})
export class NewRutComponent implements OnInit {

  createForm: FormGroup;
  canCreate: Boolean;
  uname: string;

  constructor(
    private router: Router,
    private rutService: RutService,
    private authService: AuthService,
    private formBuild: FormBuilder
  ) {}

  ngOnInit() {
    this.authService.checkAuth();
    this.authService.isAuthed.subscribe(auth => this.canCreate = auth);
    this.authService.actUser.subscribe(user => this.uname = user.uname);
    if (!this.canCreate) {
      alert("No Permission")
      return
    }

    this.createForm = this.formBuild.group(
      { 'title': ['', Validators.required],
        'url': [''],
        'content': ['', Validators.required],
        'author_id': [''],
      }
    );
  }

  onCreate() {
    const rut = this.createForm.value;
    const rutdata = Object.assign(rut, {
      uname: this.uname,
      credential: ".."
    })
    console.log(rutdata);

    let either_url_ctn = Boolean(rut.url.trim()) || Boolean(rut.content.trim());

    if (this.createForm.invalid || !either_url_ctn || !this.canCreate ) {
      alert("Invalid Input");
      return
    }
    this.rutService.create(rutdata)
    .subscribe(
      res => this.router.navigateByUrl('/r/' + res.rut.id),
      err => console.log(err)
    );
  }

}
