import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import civilizations from '../assets/civilizations-img.json';
import units from '../assets/units-img.json';

@Injectable({
  providedIn: 'root'
})
export class AoeService {
  private base = 'https://age-of-empires-2-api.herokuapp.com/api/v1/';

  constructor(private http:HttpClient){}

  getList<T>(type:'civilizations'|'units'|'structures'|'technologies'){
    return this.http.get<Resp<T>>(this.base + type);
  }

  getCivilizationImages(civilization:string){
    return (civilizations as Object).hasOwnProperty(civilization)?
      civilizations[civilization] as CivilizationImages
      :{icon: '', big: ''} as CivilizationImages;
  }

  getUnitImages(Unit:string){
    return (units as Object).hasOwnProperty(Unit)?
      units[Unit] as UnitImages
      :{render: '', imgs: []} as UnitImages;
  }

  getUnitsNames(){
    return Object.keys(units);
  }
}

type Resp<T> = {
  [key:string]: T[]
}

type CivilizationImages = {icon:string; big:string;};

type UnitImages = {render:string; imgs:string[];};
