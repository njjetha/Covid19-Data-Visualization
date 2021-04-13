import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import {Covid19Data,DistrictData,StateWiseCases,CasesData,TestingData} from 'src/app/interfaces/data-interface';
import { GoogleChartInterface } from 'ng2-google-charts';

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
  public lineGraphdata:any[]=[['Time_Period','Confirmed','Death','Recovered']];



  public transformedDistrictWiseData: Array<DistrictData> = [];
  public covid19Data: any;
  public covid19DisplayData: any;
  public chartData: Array<CasesData>;
  public barChartData: Array<TestingData>;
  public gridColumns: any;
  public treeTableColumns: any;
  public innerWidth: number;
  public _chart:any;

  public lineChartData: any;
  public barChartDisplayData: any;
  public barChartOptions: any;
  public customBarTooltips: any;
  public dailyConfirmedChart: any;
  public dailyConfirmedChartDisplayData: any;
  public dailyConfirmedChartOptions: any;
  public customDailyConfirmedTooltips: any;
  public options: any;
  public customTooltips: any;
  @ViewChild('lineChart') lineChart: any;
  @ViewChild('barChart') barChart: any;
  @ViewChild('dailyConfirmedBarChart') dailyConfirmedBarChart: any;


  public tooltipChart: GoogleChartInterface = {
    chartType: 'LineChart',
  };

  public pieChart: GoogleChartInterface = {
    chartType: 'PieChart',
  };


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
    this.getDataforChart();
  }

  public getCovidData(): void {
    this.dataservice.getCovid19Data().subscribe((data: Covid19Data) => {
      if (data !== null) {
        this.covid19Data = data.statewise;
        this.chartData = data.cases_time_series;
        this.barChartData = data.tested;
        [this.covid19Data[0], this.covid19Data[this.covid19Data.length - 1]] =
          [this.covid19Data[this.covid19Data.length - 1], this.covid19Data[0]];
        this.covid19DisplayData = this.covid19Data.filter((cases: StateWiseCases) => {
          return (parseInt(cases.confirmed, 10) !== 0);
        });
      }
    }, (error) => {
      console.log(error);
    });
  }

  public getDistrictWiseData(): void {
    this.dataservice.getDistrictWiseData().subscribe((data) => {
      if (data !== null) {
        this.districtWiseData = data;
        this.transformDistrictWiseData(this.districtWiseData);
      }
    }, (error) => {
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


  public getDataforChart():void{
    this.dataservice.getCovid19Data().subscribe((data:Covid19Data)=>{
      this.covid19Data = data.cases_time_series;
      for(const[key,value]of Object.entries(this.covid19Data)){
        var x:any=value;
        this.lineGraphdata.push([x.date,parseInt(x.dailyconfirmed),parseInt(x.dailydeceased),parseInt(x.dailyrecovered)]);
      }
      // console.log(this.lineGraphdata);
    });
    this.initChart();
  }

  initChart(){
    this.tooltipChart={
      chartType:'LineChart',
      dataTable:this.lineGraphdata,
      options: {
        title: 'Covid Cases till Date',
        legend: { position: 'top', maxLines: 3 },
        width: 700,
        height:500,
       
      animation: {
        duration: 3000,
        easing: 'out',
        startup: true
      },
      // slices: {
      //   0: {offset: 3},
      //   1: {offset: 2}
      // },
      // greenFrom: 1, greenTo: 4,
      // minorTicks: 5,
      // min: 0, max: 5,
      // majorTicks: ['0', '1', '2', '3', '4', '5'],
      // greenColor: '#d0e9c6'
      hAxis: {title: 'Time Period', minValue: 0, maxValue: 15},
      vAxis: {title: 'Daily Cases', minValue: 0, maxValue: 15},
      }
    };
  }
}
