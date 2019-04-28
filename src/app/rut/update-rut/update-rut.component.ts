import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { RutService, AuthService, Rut, RutRes } from '../../core';

@Component({
  selector: 'app-update-rut',
  templateUrl: './update-rut.component.html',
  styleUrls: ['./update-rut.component.css']
})
export class UpdateRutComponent implements OnInit {
  
  canUpdate: Boolean;
  rutForm: FormGroup;
  rut: Rut;
  rutID: string;
  uname: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rutService: RutService,
    private authService: AuthService,
    private formBuild: FormBuilder
  ) {}

  ngOnInit() {
    this.authService.checkAuth();
    this.authService.actUser$.subscribe(user => this.uname = user.uname);
    
    this.route.data.subscribe((data: { res: RutRes }) => {
      let res = data.res;
      this.rut = res.rut;
      this.rutID = this.rut.id;
      this.authService.isAuthed$.subscribe(auth => 
        this.canUpdate = auth && (res.status === 200) && (this.uname === res.rut.uname)
      );
    });

    if (!this.canUpdate) {
      alert("No Permission");
      return;
    }

    this.rutForm = this.formBuild.group(
      { 'title': [this.rut.title, [Validators.required]],
        'url': [this.rut.url || ''],
        'content': [this.rut.content || ''],
        'author': [this.rut.author || ''],
        'credential': [this.rut.credential || '...'],
      }
    );
  }

  onUpdate() {
    const rut_up = this.rutForm.value;
    const rutdata = Object.assign(rut_up, { id: this.rutID });

    let either_url_ctn = Boolean(rut_up.content.trim()) || Boolean(rut_up.url.trim());

    if (this.rutForm.invalid || !either_url_ctn || !this.canUpdate ) {
      alert("Invalid Input");
      return;
    }
    this.rutService.update(rutdata)
    .subscribe(
      res => this.router.navigateByUrl('/r/' + res.rut.slug),
      //err => console.log(err)
    );
  }
}
