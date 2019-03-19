import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSumComponent } from './item-sum.component';

describe('ItemSumComponent', () => {
  let component: ItemSumComponent;
  let fixture: ComponentFixture<ItemSumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemSumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
