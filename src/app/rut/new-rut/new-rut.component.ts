import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

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
    private formBuild: FormBuilder,
    private title: Title
  ) {}

  ngOnInit() {
    this.authService.checkAuth();
    this.authService.isAuthed$.subscribe(auth => this.canCreate = auth);
    if (!this.canCreate) {
      alert("No Permission");
      return;
    }

    this.authService.actUser$.subscribe(user => this.uname = user.uname);

    this.createForm = this.formBuild.group(
      { 'title': [null, [Validators.required]],
        'url': [''],
        'content': [''],
        'author': [''],
        'credential': [''],
      }
    );
    this.title.setTitle('Post New Collection - RutHub');
  }

  onCreate() {
    const rut = this.createForm.value;
    const rutdata = Object.assign(rut, { uname: this.uname });
    const either_url_ctn = Boolean(rut.content.trim()) || Boolean(rut.url.trim());

    if (this.createForm.invalid || !either_url_ctn || !this.canCreate ) {
      alert("Invalid Input");
      return
    }
    this.rutService.create(rutdata)
    .subscribe(
      res => this.router.navigateByUrl('/r/' + res.rut.slug),
      err => console.log(err)
    );
  }

}
