import { Component, OnInit, Input } from '@angular/core';
//import { ActivatedRoute, Router } from '@angular/router';
import { Rut, RutService, RutListRes } from '../../core';

@Component({
  selector: 'app-rut-list',
  templateUrl: './rut-list.component.html',
  styleUrls: ['./rut-list.component.css']
})
export class RutListComponent implements OnInit {
  
  constructor( private rutService: RutService) { }

  @Input() per: string;
  @Input() perid: string;
  @Input() action: string;

  ruts: Rut[];
  paging: number = 1;

  ngOnInit() {
    this.rutService.get_list(this.per, this.perid, this.paging, this.action)
    .subscribe((res: RutListRes) => {
        this.ruts = res.ruts;
        this.paging += 1;
      }
    )
  }
}
