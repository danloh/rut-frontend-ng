import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Rut, RutService, RutRes } from '../../core';

@Component({
  selector: 'app-rut-view',
  templateUrl: './rut-view.component.html',
  styleUrls: ['./rut-view.component.css']
})
export class RutViewComponent implements OnInit {

  constructor( private route: ActivatedRoute ) { }

  rutID: string;
  rut: Rut;

  ngOnInit() {
    // Retreive the prefetched data
    this.route.data.subscribe(
      (data: { res: RutRes }) => {
        this.rut = data.res.rut;

        // TODO: Load tags, items for this rut
        
      }
    );
  }

}
