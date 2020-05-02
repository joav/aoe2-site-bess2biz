import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import data from '../assets/civilizations-img.json';

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
    return (data as Object).hasOwnProperty(civilization)?
      data[civilization] as CivilizationImages
      :{icon: '', big: ''} as CivilizationImages;
  }
}

type Resp<T> = {
  [key:string]: T[]
}

type CivilizationImages = {icon:string; big:string;};
