import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalConfirmed=0;
  totalActive=0;
  totalDeath=0;
  totalRecovered=0;


  constructor(private dataservice:DataServiceService) { }

  ngOnInit(): void {
    this.dataservice.getCovidData().
      subscribe({
        next:(result)=>{
          
          for(var i=0;i<result.length;i++){
            let y=result[i].districtData;
            console.log(y);
            for (var key in y) {
              if (y.hasOwnProperty(key)) {
                // console.log("confirmed ->"+y[key].confirmed)
                this.totalConfirmed+=(y[key].confirmed);
                this.totalActive+=y[key].active;
                this.totalDeath+=y[key].deceased;
                this.totalRecovered+=y[key].recovered;
              }
            }
            // console.log("Confirmed Cases"+"-"+this.totalConfirmed);
            // console.log("Active Cases"+"-"+this.totalActive);
            // console.log("Deceased"+"-"+this.totalDeath);
          }
        }
      });

  }


}
