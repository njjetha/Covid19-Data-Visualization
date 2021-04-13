import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
// import * as moment from 'moment';

import {Covid19Data,DistrictData,StateWiseCases,CasesData,TestingData} from 'src/app/interfaces/data-interface';
@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StatesComponent implements OnInit {
  public districtWiseData:any;
  public totalConfirmed=0;
  public totalActive=0;
  public totalRecovered=0;
  public totalDeath=0;
  public transformedDistrictWiseData: Array<DistrictData> = [];
  public covid19Data: any;
  public covid19DisplayData: any;
  public chartData: Array<CasesData>;
  public barChartData: Array<TestingData>;
  public gridColumns: any;
  public treeTableColumns: any;
  public innerWidth: number;







  constructor(private dataservice:DataServiceService) { 
    this.chartData=[];
    this.barChartData=[];
    this.innerWidth=window.innerWidth;
   
  }

  ngOnInit(): void {
   
    this.gridColumns = this.dataservice.getGridColumns();
    this.treeTableColumns = this.dataservice.getTreeTableColumns();
    this.getCovidData();
    this.getDistrictWiseData();

    
  }


  public getCovidData(): void {
    // this.paginator.isLoading = true;
    this.dataservice.getCovid19Data().subscribe((data: Covid19Data) => {
      if (data !== null) {
        // this.paginator.isLoading = false;
        this.covid19Data = data.statewise;
        this.chartData = data.cases_time_series;
        this.barChartData = data.tested;
        [this.covid19Data[0], this.covid19Data[this.covid19Data.length - 1]] =
          [this.covid19Data[this.covid19Data.length - 1], this.covid19Data[0]];
        // this.lastUpdatedOn();
        // this.prepareChartsData();
        this.covid19DisplayData = this.covid19Data.filter((cases: StateWiseCases) => {
          return (parseInt(cases.confirmed, 10) !== 0);
        });
      }
    }, (error) => {
      // this.paginator.isLoading = false;
      console.log(error);
    });

   

  }




  public getDistrictWiseData(): void {
    // this.paginator.isLoading = true;
    this.dataservice.getDistrictWiseData().subscribe((data) => {
      if (data !== null) {
        // this.paginator.isLoading = false;
        this.districtWiseData = data;
        this.transformDistrictWiseData(this.districtWiseData);
      }
    }, (error) => {
      // this.paginator.isLoading = false;
      console.log(error);
    });
  }


  transformDistrictWiseData(districtWiseData:any): void {
      for (const [key, value] of Object.entries(districtWiseData)) {
          var x:any=value
        for (const [key1, value1] of Object.entries(x)) {
            var y:any=value1
          for (const [key2, value2] of Object.entries(y)) {
              var z:any=value2;
            if (key1 !== 'statecode') {
              this.totalConfirmed=this.totalConfirmed+z.confirmed;
              this.totalDeath+=z['deceased'];
              this.totalRecovered+=z['recovered'];
              this.totalActive+=z['active'];
              this.transformedDistrictWiseData.push({ state: key, district: key2, confirmed: z['confirmed'] });
              }
        }
      }
    }
    // console.log(this.DistrictWiseData);
  }


}
