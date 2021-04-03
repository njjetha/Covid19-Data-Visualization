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



  getCovidData(){
    return this.http.get(this.globalDataUrl,{responseType:'json'}).pipe(
      map(result=>{
      let x=Object.values(result);
      x.splice(0,1);


      // for(var i=0;i<x.length;i++){
      //   let y=x[i].districtData;
      //   for (var key in y) {
      //     if (y.hasOwnProperty(key)) {
      //         console.log(key + " -> " + y[key].active);
      //     }
      //   }
      // }
        
     
       return x;
      })
    ); 
   }
}
