import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Hexagon } from "../models/hexagon";

@Component({
  selector: 'app-hexagon',
  templateUrl: './hexagon.component.html',
  styleUrls: ['./hexagon.component.scss']
})
export class HexagonComponent implements OnInit {
  @Input() hexagon:Hexagon;
  @Output() click = new EventEmitter();

  constructor() { }

  ngOnInit(): void {}

  onClick(){
    this.click.emit();
  }
}
