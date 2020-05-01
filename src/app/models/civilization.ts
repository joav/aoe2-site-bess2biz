export interface Civilization {
  id:number;
  name:string;
  expansion:string;
  army_type:string;
  unique_unit:string[];
  unique_tech:string[];
  team_bonus:string;
  civilization_bonus:string[];
}

export const labels = {
  name: 'Nombre',
  expansion: 'Expansión',
  army_type: 'Tipo de ejercito',
  unique_unit: 'Unidades únicas',
  unique_tech: 'Tecnologías únicas',
  team_bonus: 'Bonus de equipo',
  civilization_bonus: 'Bonus de civilización'
};
