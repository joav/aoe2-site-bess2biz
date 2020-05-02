import { Component, OnInit, Input } from '@angular/core';

import { AoeService } from '../aoe.service';
import { Civilization, labels } from "../models/civilization";
import { Hexagon } from '../models/hexagon';
import { InfoData } from '../models/info-data';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss']
})
export class UnitsComponent implements OnInit {
  civilizations:Civilization[] = [];
  hexagons:Hexagon[] = [];
  data:InfoData[] = [];

  constructor(private aoe:AoeService) {
    this.aoe.getList<Civilization>('civilizations').subscribe(civilizations => {
      this.civilizations = civilizations.civilizations;

      this.hexagons = this.civilizations.map(c => ({
        id: c.id,
        icon: ''
      }));

      console.log(this.civilizations)
      this.onSelect(this.civilizations[0].id);
    });
  }

  ngOnInit(): void {
  }

  onSelect(id:number){
    const selected = this.civilizations.find(c => c.id == id);
    const data = [];
    for (const key in labels) {
      if (labels.hasOwnProperty(key)) {
        const label = labels[key];
        data.push({
          name: label,
          value: (selected[key] instanceof Array)?selected[key].join(', '):selected[key]
        } as InfoData);
      }
    }
    this.data = data;
  }
}
