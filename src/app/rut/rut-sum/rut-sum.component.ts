import { Component, Input, OnChanges } from '@angular/core';
import { Rut } from '../../core';

@Component({
  selector: 'app-rut-sum',
  templateUrl: './rut-sum.component.html',
  styleUrls: ['./rut-sum.component.css']
})
export class RutSumComponent implements OnChanges {

  constructor() {}

  @Input() rut: Rut;

  ngOnChanges() {}
}
