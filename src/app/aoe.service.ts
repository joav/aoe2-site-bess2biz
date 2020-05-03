import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import civilizations from '../assets/civilizations-img.json';
import units from '../assets/units-img.json';
import structures from "../assets/structures-img.json";
import technologies from "../assets/technologies-img.json";

@Injectable({
  providedIn: 'root'
})
export class AoeService {
  private base = 'https://age-of-empires-2-api.herokuapp.com/api/v1/';
  private units = units;
  private structures = structures;
  private technologies = technologies;

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
    return (this.units as Object).hasOwnProperty(Unit)?
      this.units[Unit] as UnitImages
      :{render: '', imgs: []} as UnitImages;
  }

  getNextUnitImages(unit:string){
    if((this.units as Object).hasOwnProperty(unit)){
      let nextImg = this.units[unit].imgs[0];
      if(this.units[unit].imgs.length > 1){
        nextImg = this.units[unit].imgs.shift();
        this.units[unit].imgs.push(nextImg);
      }
      return nextImg;
    }else{
      return '';
    }
  }

  getUnitsNames(){
    return Object.keys(this.units);
  }

  getStructureImages(structure:string){
    return (this.structures as Object).hasOwnProperty(structure)?
      this.structures[structure] as StructureImages
      :{render: '', imgs: []} as StructureImages;
  }

  getNextStructureImages(structure:string){
    if((this.structures as Object).hasOwnProperty(structure)){
      let nextImg = this.structures[structure].imgs[0];
      if(this.structures[structure].imgs.length > 1){
        nextImg = this.structures[structure].imgs.shift();
        this.structures[structure].imgs.push(nextImg);
      }
      return nextImg;
    }else{
      return '';
    }
  }

  getStructuresNames(){
    return Object.keys(this.structures);
  }

  getTechnologyImages(technology:string){
    return (this.technologies as Object).hasOwnProperty(technology)?
      this.technologies[technology] as TechnologyImages
      :{render: '', imgs: []} as TechnologyImages;
  }

  getNextTechnologyImages(technology:string){
    if((this.technologies as Object).hasOwnProperty(technology)){
      let nextImg = this.technologies[technology].imgs[0];
      if(this.technologies[technology].imgs.length > 1){
        nextImg = this.technologies[technology].imgs.shift();
        this.technologies[technology].imgs.push(nextImg);
      }
      return nextImg;
    }else{
      return '';
    }
  }

  getTechnologiesNames(){
    return Object.keys(this.technologies);
  }
}

type Resp<T> = {
  [key:string]: T[]
}

type CivilizationImages = {icon:string; big:string;};

type UnitImages = {render:string; imgs:string[];};

type StructureImages = {render:string; imgs:string[];};

type TechnologyImages = {render:string; imgs:string[];};
