import { Component, OnInit } from '@angular/core';

import { AoeService } from '../aoe.service';
import { Structure } from "../models/structure";
import { Hexagon } from '../models/hexagon';
import { InfoData } from '../models/info-data';
import { aoeResourceToInfoData } from '../utilities';

@Component({
  selector: 'app-structures',
  templateUrl: './structures.component.html',
  styleUrls: ['./structures.component.scss']
})
export class StructuresComponent implements OnInit {
  structures:Structure[] = [];
  hexagons:Hexagon[] = [];
  data:InfoData[] = [];
  bigImage = '';

  constructor(private aoe:AoeService) {
    this.aoe.getList<Structure>('structures').subscribe(structures => {
      this.structures = structures.structures.filter(u => this.aoe.getStructuresNames().includes(u.name));

      this.hexagons = this.structures.map(c => ({
        id: c.id,
        name: c.name,
        icon: this.aoe.getStructureImages(c.name).render
      }));

      this.onSelect(this.structures[0].id);
      this.preloadImages();
    });
  }

  ngOnInit(): void {
  }

  onSelect(id:number){
    const selected = this.structures.find(c => c.id == id);
    this.bigImage = this.aoe.getNextStructureImages(selected.name);
    this.data = aoeResourceToInfoData(selected);
  }

  async preloadImages(){
    this.structures.forEach(async c => {
      const imgIcon = new Image();
      imgIcon.src = this.aoe.getStructureImages(c.name).render;
      for (const img of this.aoe.getStructureImages(c.name).imgs) {
        const imgBig = new Image();
        imgBig.src = img;
      }
    });
  }

}
