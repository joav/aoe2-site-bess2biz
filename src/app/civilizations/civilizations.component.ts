import { Component, OnInit, Input } from '@angular/core';

import { AoeService } from '../aoe.service';
import { Civilization } from "../models/civilization";
import { Hexagon } from '../models/hexagon';
import { InfoData } from '../models/info-data';
import { aoeResourceToInfoData } from "../utilities";

@Component({
  selector: 'app-civilizations',
  templateUrl: './civilizations.component.html',
  styleUrls: ['./civilizations.component.scss']
})
export class CivilizationsComponent implements OnInit {
  civilizations:Civilization[] = [];
  hexagons:Hexagon[] = [];
  data:InfoData[] = [];
  bigImage = '';

  constructor(private aoe:AoeService) {
    this.aoe.getList<Civilization>('civilizations').subscribe(civilizations => {
      this.civilizations = civilizations.civilizations;

      this.hexagons = this.civilizations.map(c => ({
        id: c.id,
        icon: this.aoe.getCivilizationImages(c.name).icon
      }));

      console.log(this.civilizations)
      this.onSelect(this.civilizations[0].id);
      this.preloadImages();
    });
  }

  async preloadImages(){
    this.civilizations.forEach(async c => {
      const imgIcon = new Image();
      imgIcon.src = this.aoe.getCivilizationImages(c.name).icon;
      const imgBig = new Image();
      imgBig.src = this.aoe.getCivilizationImages(c.name).big;
    });
  }

  ngOnInit(): void {
  }

  onSelect(id:number){
    const selected = this.civilizations.find(c => c.id == id);
    this.bigImage = this.aoe.getCivilizationImages(selected.name).big;
    this.data = aoeResourceToInfoData(selected);
  }
}
