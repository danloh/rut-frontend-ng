import { Component, OnInit, Input } from '@angular/core';
import { Rut } from '../../core';

@Component({
  selector: 'app-rut-sum',
  templateUrl: './rut-sum.component.html',
  styleUrls: ['./rut-sum.component.css']
})
export class RutSumComponent implements OnInit {

  constructor() { }

  @Input() rut: Rut;

  toUrl: string;

  ngOnInit() {
    this.toUrl = this.rut.content 
      ? '/r/' + this.rut.id 
      : '/rforum/' + this.rut.id
  }

}
