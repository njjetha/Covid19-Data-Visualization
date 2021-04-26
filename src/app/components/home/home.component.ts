import { Component, OnInit,ViewChild } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts';
import { Covid19Data } from 'src/app/interfaces/data-interface';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('mychart1 ', {static: false}) mychart1:any;
  @ViewChild('mychart2 ', {static: false}) mychart2:any;
  @ViewChild('mychart3 ', {static: false}) mychart3:any;

  public covid19Data: any;
  public DailyConfirmed:any;
  public DailyRecovered:any;
  public DailyDeceased:any;


  tempConfirmed:number=0;
  tempActive:number=0;
  tempRecovered:number=0;
  tempDeath:number=0;
  totalConfirmed=0;
  totalActive=0;
  totalDeath=0;
  totalRecovered=0;
  Confirmed:any;  
  Active:any;
  Death:any;
  Recovered:any;
  database:any[]=[];
  database_confirmed:any[]=[];
  database_active:any[]=[];
  database_recovered:any[]=[];
  database_deaths:any[]=[];
  public pieChart: GoogleChartInterface = {
    chartType: 'PieChart',
  };

  public ColumnChart: GoogleChartInterface = {
    chartType: 'ColumnChart',
  };

  public geoChart: GoogleChartInterface = {
    chartType: 'GeoChart'
  };

  constructor(private dataservice:DataServiceService) { }


  initChart(caseType:string){
    // console.log(caseType);
    
    if(caseType=='c')
      this.database=this.database_confirmed;
    if(caseType=='a')
      this.database=this.database_active;
    if(caseType=='r')
      this.database=this.database_recovered;
    if(caseType=='d')
      this.database=this.database_deaths;
  

  //  console.log(this.database);

    this.pieChart={
      chartType: 'PieChart',
      // dataTable: this.database,
      dataTable:this.database,
      //firstRowIsData: true,
       options: {
        backgroundColor: '#f1f8e9',
        width: 1200,
        height:500,           
        },
    };
  
  this.ColumnChart={
    chartType: 'ColumnChart',
    // dataTable: this.database,
    dataTable:this.database,
    //firstRowIsData: true,
      options: {
        height:500,
        width:1200,
        hAxis: {
          title: 'States', 
          minValue: 0, 
          maxValue: 15},
        vAxis: {
          title: 'Total Cases',
          scaleType:'log',
          // gridlines:{count:40}
        }
      },
    };

    // console.log(this.pieChart.dataTable);
                       // added by gourav for geochart
    this.geoChart={
      chartType: 'GeoChart',
    dataTable: this.database,
    options: {
      region: 'IN', // INDIA
      colorAxis: {colors: ['rgb(158, 197, 107)','rgb(228, 222, 222)','rgb(223, 126, 126)','rgb(197, 107, 182)','rgb(226, 87, 87)','rgb(223, 58, 58)','rgb(216, 24, 24)']},
      resolution: 'provinces',
      backgroundColor: '#00000',
      datalessRegionColor: '#00000',
      defaultColor: '#00000',
      width: 1200,
      height:500,
    } 
  };

// '#00F919', '#0FFFE4', '#1FA20F','#156930','#033E3B'
  }




  ngOnInit(): void {
    this.database_confirmed.push(["State","Confirmed Cases"]);
    this.database_active.push(["State","Active Cases"]);
    this.database_recovered.push(["State","Recovered Cases"]);
    this.database_deaths.push(["State","Death Cases"]);
    this.dataservice.getCovidData().
      subscribe({
        next:(result)=>{
          
          for(var i=0;i<result.length;i++){
            let y=result[i].districtData;
            //  console.log(y);
            this.tempConfirmed=0;
            this.tempActive=0;
            this.tempRecovered=0;
            this.tempDeath=0;
            for (var key in y) {
              if (y.hasOwnProperty(key)) {
                // console.log("confirmed ->"+y[key].confirmed)
                this.tempConfirmed+=y[key].confirmed;
                this.totalConfirmed+=(y[key].confirmed);
                this.tempActive+=y[key].active
                this.totalActive+=y[key].active;
                this.tempDeath+=y[key].deceased; 
                this.totalDeath+=y[key].deceased;
                this.tempRecovered+=y[key].recovered;
                this.totalRecovered+=y[key].recovered;
              }
            }
            // console.log("Confirmed Cases"+"-"+this.totalConfirmed);
            // console.log("Active Cases"+"-"+this.totalActive);
            // console.log("Deceased"+"-"+this.totalDeath);
            this.Confirmed=this.totalConfirmed.toLocaleString('en-IN', {maximumFractionDigits:2});
            this.Active=this.totalActive.toLocaleString('en-IN', {maximumFractionDigits:2});
            this.Death=this.totalDeath.toLocaleString('en-IN',{maximumFractionDigits:2});
            this.Recovered=this.totalRecovered.toLocaleString('en-IN',{maximumFractionDigits:2});
            // console.log(this.Confirmed);
            this.database_confirmed.push([this.dataservice.getStateName(i),this.tempConfirmed]);
            this.database_active.push([this.dataservice.getStateName(i),this.tempActive]);
            this.database_recovered.push([this.dataservice.getStateName(i),this.tempRecovered]);
            this.database_deaths.push([this.dataservice.getStateName(i),this.tempDeath]);
            
          }
          // console.log(this.database);
          this.initChart('c');
        }
      });

      this.getDailyData();

  }

  updateChart(input:HTMLInputElement){
    // console.log(input.value);
    this.initChart(input.value);
    this.mychart1.draw();
    this.mychart2.draw();
    this.mychart3.draw();
   
   
  }

  public getDailyData():void{
    this.dataservice.getCovid19Data().subscribe((data:Covid19Data)=>{
      this.covid19Data = data.cases_time_series;
      for(const[key,value]of Object.entries(this.covid19Data)){
        var x:any=value;
        this.DailyConfirmed=parseInt(x.dailyconfirmed);
        this.DailyDeceased=parseInt(x.dailydeceased);
        this.DailyRecovered=parseInt(x.dailyrecovered);
      }
      // console.log(this.DailyConfirmed);
      this.DailyConfirmed=this.DailyConfirmed.toLocaleString('en-IN', {maximumFractionDigits:2});
      this.DailyDeceased=this.DailyDeceased.toLocaleString('en-IN', {maximumFractionDigits:2});
      this.DailyRecovered=this.DailyRecovered.toLocaleString('en-IN', {maximumFractionDigits:2});
    });
  }



}
