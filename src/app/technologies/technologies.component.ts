import { Component, OnInit } from '@angular/core';

import { AoeService } from '../aoe.service';
import { Technology } from "../models/technology";
import { Hexagon } from '../models/hexagon';
import { InfoData } from '../models/info-data';
import { aoeResourceToInfoData } from '../utilities';

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.scss']
})
export class TechnologiesComponent implements OnInit {
  technologies:Technology[] = [];
  hexagons:Hexagon[] = [];
  data:InfoData[] = [];
  bigImage = '';

  constructor(private aoe:AoeService) {
    this.aoe.getList<Technology>('technologies').subscribe(technologies => {
      this.technologies = technologies.technologies.filter(u => this.aoe.getTechnologiesNames().includes(u.name));

      this.hexagons = this.technologies.map(c => ({
        id: c.id,
        name: c.name,
        icon: this.aoe.getTechnologyImages(c.name).render
      }));

      this.onSelect(this.technologies[0].id);
      this.preloadImages();
    });
  }

  ngOnInit(): void {
  }

  onSelect(id:number){
    const selected = this.technologies.find(c => c.id == id);
    this.bigImage = this.aoe.getNextTechnologyImages(selected.name);
    this.data = aoeResourceToInfoData(selected);
  }

  async preloadImages(){
    this.technologies.forEach(async c => {
      const imgIcon = new Image();
      imgIcon.src = this.aoe.getTechnologyImages(c.name).render;
      for (const img of this.aoe.getTechnologyImages(c.name).imgs) {
        const imgBig = new Image();
        imgBig.src = img;
      }
    });
  }

}
