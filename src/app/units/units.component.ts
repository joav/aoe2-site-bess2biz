import { Component, OnInit } from '@angular/core';

import { AoeService } from '../aoe.service';
import { Unit } from "../models/unit";
import { Hexagon } from '../models/hexagon';
import { InfoData } from '../models/info-data';
import { aoeResourceToInfoData } from '../utilities';


@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss']
})
export class UnitsComponent implements OnInit {
  units:Unit[] = [];
  hexagons:Hexagon[] = [];
  data:InfoData[] = [];
  bigImage = '';

  constructor(private aoe:AoeService) {
    this.aoe.getList<Unit>('units').subscribe(units => {
      this.units = units.units.filter(u => this.aoe.getUnitsNames().includes(u.name));

      this.hexagons = this.units.map(c => ({
        id: c.id,
        icon: this.aoe.getUnitImages(c.name).render
      }));

      console.log(this.units)
      this.onSelect(this.units[0].id);
    });
  }

  ngOnInit(): void {
  }

  onSelect(id:number){
    const selected = this.units.find(c => c.id == id);
    const index = getRndInteger(0, this.aoe.getUnitImages(selected.name).imgs.length - 1);
    console.log(selected.name, index);
    this.bigImage = this.aoe.getUnitImages(selected.name).imgs[index];
    this.data = aoeResourceToInfoData(selected);
  }

  async preloadImages(){
    this.units.forEach(async c => {
      const imgIcon = new Image();
      imgIcon.src = this.aoe.getUnitImages(c.name).render;
      for (const img of this.aoe.getUnitImages(c.name).imgs) {
        const imgBig = new Image();
        imgBig.src = img;
      }
    });
  }
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}
