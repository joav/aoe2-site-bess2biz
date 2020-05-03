export interface Technology {
  id:number;
  name:string;
  description:string;
  expansion:string;
  age:string;
  develops_in:string;
  cost:{
    Wood:number;
    Food:number;
    Stone:number;
    Gold:number;
  };
  build_time:number;
  applies_to:string[];
}
