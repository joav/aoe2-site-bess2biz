import { InfoData } from "./models/info-data";

export function aoeResourceToInfoData(obj:any):InfoData[]{
  const data:InfoData[] = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && key != 'id') {
      let value:string|number = '';
      let isObject = false;
      if(obj[key] instanceof Array){
        value = obj[key].map(clearStrValue).join(', ');
      }else if(typeof obj[key] == 'object'){
        isObject = true;
      }else if(typeof obj[key] == 'string'){
        value = clearStrValue(obj[key]);
      }else{
        value = obj[key];
      }
      data.push({
        name: parseUnderScoreStr(key),
        value
      });
      if(isObject){
        for (const key2 in obj[key]) {
          if (obj[key].hasOwnProperty(key2)) {
            data.push({
              name: `* ${parseUnderScoreStr(key2)}`,
              value: obj[key][key2]
            });
          }
        }
      }
    }
  }
  return data;
}

function clearStrValue(val:string){
  if(val.includes('http')){
    val = parseUnderScoreStr(val.substr(val.lastIndexOf('/') + 1));
  }
  return val;
}

function parseUnderScoreStr(str:string){
  return str.substr(0,1).toUpperCase()+str.substr(1).replace(/\_/g,' ');
}
