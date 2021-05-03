import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';
import { componentFactoryName } from '@angular/compiler';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { DashboardCardComponent } from '../components/dashboard-card/dashboard-card.component';
import { HomeComponent } from '../components/home/home.component';
 
import { DataServiceService } from './data-service.service';
 
fdescribe('DataServiceService', () => {
  let service: DataServiceService;
  
 
  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent,DashboardCardComponent],
       providers:[DataServiceService],
      imports:[HttpClientTestingModule,Ng2GoogleChartsModule ]
    }).compileComponents();
    service = TestBed.inject(DataServiceService);
  });
 
  it('should be created', () => {
    expect(service).toBeTruthy();
       
  });
});