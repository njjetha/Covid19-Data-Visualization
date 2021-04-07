import { Component, Input, OnInit } from '@angular/core';

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
  constructor() { }
 

  ngOnInit(): void {
  }

}
