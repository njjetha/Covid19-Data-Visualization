import { Component, Input, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css']
})
export class DashboardCardComponent implements OnInit {

  @Input('Confirmed')
  Confirmed:any;
  @Input('Active')
  Active:any;
  @Input('Death')
  Death:any;
  @Input('Recovered')
  Recovered:any;
  @Input('dailyc')
  DailyConfirmed:any;
  @Input('dailyd')
  DailyDeceased:any;
  @Input('dailyr')
  DailyRecovered:any;


  constructor(private logger: NGXLogger) { 
    this.logger.debug('Dashboard Component working correctly');
  }
 
  ngOnInit(): void {
    // this.logger.debug('Active cases'+parseInt(this.Active));
  }

}
