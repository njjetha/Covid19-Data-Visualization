import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private globalDataUrl=`https://api.covid19india.org/csv/latest/districts.csv`
  constructor(private http:HttpClient) { }

  getCovidData(){
    return this.http.get(this.globalDataUrl,{responseType:'text'}).pipe(
      map(result=>{
        // console.log(result);
        let rows=result.split('\n');
        console.log(rows);
        rows.forEach(row=>{
          let cols=row.split(',');
          console.log(cols);
        })
        return [];
       
      })
    ); 
   }
}
