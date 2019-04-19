import { Component, OnInit, Input } from '@angular/core';
import { Rut } from '../../core';

@Component({
  selector: 'app-rut-sum',
  templateUrl: './rut-sum.component.html',
  styleUrls: ['./rut-sum.component.css']
})
export class RutSumComponent implements OnInit {

  constructor() {}

  @Input() rut: Rut;

  pt: string;

  ngOnInit() {
    this.pt = this.rut.slug || this.rut.id;  // for backward compatible
  }
}
