import { Component, Input, OnChanges } from '@angular/core';
import { Rut, RutService, RutListRes } from '../../core';

@Component({
  selector: 'app-rut-list',
  templateUrl: './rut-list.component.html',
  styleUrls: ['./rut-list.component.css']
})
export class RutListComponent implements OnChanges {
  
  constructor( private rutService: RutService) {}

  @Input() per: string;
  @Input() perid: string;
  @Input() action: string;

  ruts: Rut[];
  totalCount: number;
  paging: number = 1;
  hasMore: Boolean;

  ngOnChanges() {
    this.rutService.get_list(this.per, this.perid, this.paging, this.action)
    .subscribe((res: RutListRes) => {
      this.ruts = res.ruts;
      this.totalCount = res.count;
      this.checkMore();
    });
  }

  loadMore() {
    this.rutService.get_list(this.per, this.perid, this.paging + 1, this.action)
    .subscribe((res: RutListRes) => {
      const res_ruts = res.ruts;
      this.ruts.push(...res_ruts);
      this.checkMore();
      this.paging += 1;
    });
  }

  checkMore() {
    this.hasMore = this.ruts.length < this.totalCount;
  }
}
