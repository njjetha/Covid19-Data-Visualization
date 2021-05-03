import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataServiceService } from 'src/app/services/data-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { GoogleChartInterface, Ng2GoogleChartsModule } from 'ng2-google-charts';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { DashboardCardComponent } from 'src/app/components/dashboard-card/dashboard-card.component';
import { isDefined } from '@angular/compiler/src/util';
import { of } from 'rxjs'; 
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
 
fdescribe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let usersService: DataServiceService; // Add this
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent,DashboardCardComponent ],
      providers:[DataServiceService],
      imports:[HttpClientTestingModule,Ng2GoogleChartsModule,
      
          
                   ]
    })
    .compileComponents();
    
    usersService = TestBed.get(DataServiceService); // Add this
  });
 
  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    usersService = fixture.debugElement.injector.get(DataServiceService);
    fixture.detectChanges();
  });
 
  it('should create', () => {
    //expect(component).toBeTruthy();
    // component.ngOnInit();
    // console.log(component.Recovered);
    //expect(component.Recovered).toBe(;
    expect(usersService).toBeTruthy();
 
    component.ngOnInit();
    
    
      
    });
 
    it('should init charts', () => {
      expect(component.mychart1).toBeDefined();
      
      
      });
  });
  