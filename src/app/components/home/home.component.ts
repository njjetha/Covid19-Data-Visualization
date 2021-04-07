import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tempConfirmed:number=0;
  totalConfirmed=0;
  totalActive=0;
  totalDeath=0;
  totalRecovered=0;
  Confirmed:any;  
  Active:any;
  Death:any;
  Recovered:any;
  database:any[]=[];
  public pieChart: GoogleChartInterface = {
    chartType: 'PieChart',
  };

  public ColumnChart: GoogleChartInterface = {
    chartType: 'ColumnChart',
  };
  constructor(private dataservice:DataServiceService) { }


  initChart(){
    this.pieChart={
      chartType: 'PieChart',
      // dataTable: this.database,
      dataTable:this.database,
      //firstRowIsData: true,
       options: {
        "backgroundColor": '#f1f8e9',
        width: '100px',
        chartArea: {
            left: "5%",
            top: "20%",
            bottom:"10%",
            height: "1000",
            width: "1000"
        }            
        },
    };
  
  this.ColumnChart={
    chartType: 'ColumnChart',
    // dataTable: this.database,
    dataTable:this.database,
    //firstRowIsData: true,
      options: {
        height:500,
        width:1200
      },
  };

   console.log(this.database);
  }




  ngOnInit(): void {
    this.database.push(["State","Cases"]);
    this.dataservice.getCovidData().
      subscribe({
        next:(result)=>{
          
          for(var i=0;i<result.length;i++){
            let y=result[i].districtData;
            //  console.log(y);
            this.tempConfirmed=0;
            for (var key in y) {
              if (y.hasOwnProperty(key)) {
                // console.log("confirmed ->"+y[key].confirmed)
                this.tempConfirmed+=y[key].confirmed;
                this.totalConfirmed+=(y[key].confirmed);
                this.totalActive+=y[key].active;
                this.totalDeath+=y[key].deceased;
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
            this.database.push([this.dataservice.getStateName(i),this.tempConfirmed]);
            
          }
          // console.log(this.database);
          this.initChart();
        }
      });

  }


}
