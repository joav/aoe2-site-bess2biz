import { Component, OnInit, Input } from '@angular/core';

import { AoeService } from '../aoe.service';
import { Civilization, labels } from "../models/civilization";
import { Hexagon } from '../models/hexagon';
import { InfoData } from '../models/info-data';

@Component({
  selector: 'app-civilizations',
  templateUrl: './civilizations.component.html',
  styleUrls: ['./civilizations.component.scss']
})
export class CivilizationsComponent implements OnInit {
  @Input() isOdd = false;

  civilizations:Civilization[] = [];
  selected:Civilization;

  constructor(private aoe:AoeService) {
    this.aoe.getList<Civilization>('civilizations').subscribe(civilizations => {
      this.civilizations = civilizations;
      this.onSelect(this.civilizations[0].id);
    });
  }

  ngOnInit(): void {
  }

  onSelect(id:number){
    this.selected = this.civilizations.find(c => c.id == id);
  }

  get hexagons():Hexagon[]{
    return this.civilizations.map(c => ({
      id: c.id,
      icon: ''
    }));
  }

  get data():InfoData[]{
    if(this.selected){
      const data:InfoData[] = [];
      for (const key in labels) {
        if (labels.hasOwnProperty(key)) {
          const label = labels[key];
          data.push({
            name: label,
            value: (this.selected[key] instanceof Array)?this.selected[key].join(', '):this.selected[key]
          } as InfoData);
        }
      }
    }else{
      return [];
    }
  }
}
