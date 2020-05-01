import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Hexagon } from "../models/hexagon";
import { InfoData } from "../models/info-data";

@Component({
  selector: 'app-aoe-item',
  templateUrl: './aoe-item.component.html',
  styleUrls: ['./aoe-item.component.scss']
})
export class AoeItemComponent implements OnInit {
  @Input() title = '';
  @Input() isOdd = false;
  @Input() hexagons:Hexagon[] = [];
  @Input() data:InfoData[] = [];

  @Output() selected = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void { }

  onSelect(id:number) {
    this.selected.emit(id);
  }
}
