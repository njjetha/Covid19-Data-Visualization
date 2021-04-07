import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { covidDataSumary } from '../models/coviddata';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private globalDataUrl=`https://api.covid19india.org/state_district_wise.json`
  constructor(private http:HttpClient) { }

  stateName:any[]=[]; //It will hold the stateName 

  getCovidData(){
    return this.http.get(this.globalDataUrl,{responseType:'json'}).pipe(
      map(result=>{
 
        
    //used to display the state value as key

    
    for(var key in result){
      if(result.hasOwnProperty(key)){
        this.stateName.push(key);
        // console.log(key);
      }  
    }
    this.stateName.splice(0,1);
    // console.log(this.stateName[0]);   

    let x=Object.values(result);
      x.splice(0,1);
    /*  for(var i=0;i<x.length;i++){
          let y=x[i].districtData;
          for (var key in y) {
            if (y.hasOwnProperty(key)) {
                console.log(key + " -> " + y[key].active);
            }
          }
        }*/
      return x;
      })
    ); 
  }

  
  getStateName(index:number) {
    return this.stateName[index];
  }
}
