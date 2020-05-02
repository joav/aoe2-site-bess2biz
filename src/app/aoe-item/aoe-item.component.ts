import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Hexagon } from "../models/hexagon";
import { InfoData } from "../models/info-data";

const loadedImages:string[] = [];

@Component({
  selector: 'app-aoe-item',
  templateUrl: './aoe-item.component.html',
  styleUrls: ['./aoe-item.component.scss']
})
export class AoeItemComponent implements OnInit {
  @Input() title = '';
  _bigImage = '';
  @Input() set bigImage(val:string){
    if(loadedImages.length === 0){
      this._bigImage = val;
      loadedImages.push(this._bigImage);
    }else{
      this.newBigImage = val;
      this.changeImage();
    }
  };
  get bigImage(){
    return this._bigImage;
  }
  newBigImage = '';
  @ViewChild('.new-big') newBig:ElementRef;
  @Input() isOdd = false;
  @Input() hexagons:Hexagon[] = [];
  @Input() data:InfoData[] = [];
  @Input() hexagonsPerLine = 5;
  @Input() small = false;

  @Output() selected = new EventEmitter<number>();

  animate = false;
  toSelect = null;

  constructor() { }

  ngOnInit(): void { }

  onSelect(id:number) {
    if(!this.animate){
      this.selected.emit(id);
    }else{
      this.toSelect = id;
    }
  }

  private changeImage(){
    if(loadedImages.includes(this.newBigImage)){
      if(this.newBigImage != ''){
        this.animate = true;
        setTimeout(() => {
          if(this.newBigImage != ''){
            this._bigImage = this.newBigImage;
            this.newBigImage = '';
            this.animate = false;
            if(this.toSelect){
              this.selected.emit(this.toSelect);
              this.toSelect = null;
            }
          }
        }, 600);
      }
    }else{
      loadedImages.push(this.newBigImage);
    }
  }
  newBigImageLoaded() {
    this.changeImage();
  }
}
