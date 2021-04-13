import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { Covid19Data } from '../interfaces/data-interface';
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

  public getGridColumns() {
    const columns = [
      {
        field: 'blank', header: '', mobileHeader: '', style: { width: '2%', 'text-align': 'right'}
      },
      {
        field: 'state', header: 'STATE/UT', mobileHeader: 'STATE/UT', style: { width: '80px', 'min-width': '30px', 'max-width': '100px'}
      },
      {
        field: 'confirmed', header: 'CONFIRMED', mobileHeader: 'CNFM', style: { width: '50px', 'min-width': '10px', 'max-width': '100px'}
      },
      {
        field: 'active', header: 'ACTIVE', mobileHeader: 'ACTV', style: { width: '50px', 'min-width': '10px', 'max-width': '100px'}
      },
      {
        field: 'recovered', header: 'RECOVERED', mobileHeader: 'RCVD', style: { width: '50px', 'min-width': '10px', 'max-width': '100px'}
      },
      {
        field: 'deaths', header: 'DEATHS', mobileHeader: 'DTHS', style: { width: '50px', 'min-width': '10px', 'max-width': '100px'}
      },
    ];
    return columns;
  }

  public getTreeTableColumns() {
    const columns = [
      {
        field: 'district', header: 'DISTRICT', style: { width: '75px', 'min-width': '75px', 'max-width': '100px'}
      },
      {
        field: 'confirmed', header: 'CONFIRMED', style: { width: '75px', 'min-width': '75px', 'max-width': '100px'}
      }
    ];
    return columns;
  }

  public getCovid19Data() {
    return this.http.get<Covid19Data>('https://api.covid19india.org/data.json');
  }

  public getDistrictWiseData() {
    return this.http.get('https://api.covid19india.org/state_district_wise.json');
  }



}
