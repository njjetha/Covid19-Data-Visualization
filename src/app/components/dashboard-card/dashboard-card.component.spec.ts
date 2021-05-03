import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataServiceService } from 'src/app/services/data-service.service';
import { By } from '@angular/platform-browser';
 
import { of } from 'rxjs'; // Add import
 
import { DashboardCardComponent } from './dashboard-card.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
 
fdescribe('DashboardCardComponent', () => {
  let component: DashboardCardComponent;
  let fixture: ComponentFixture<DashboardCardComponent>;
  let usersService: DataServiceService;
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardCardComponent ],
      providers:[DataServiceService],
      imports:[HttpClientTestingModule,Ng2GoogleChartsModule,
      
          
        
             ]
    })
    .compileComponents();
    usersService = TestBed.get(DataServiceService); // Add this
  });
 
 
  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });
 
  it('should create component', () => {
    expect(component).toBeTruthy();
    
  });
 
  // it('should show Confirmed Cases', () => {
   
  //   const board = fixture.debugElement.query(By.css('div[class=label]'));
  //   console.log(board.nativeElement.textContent);
   
  //   expect(board.nativeElement.textContent).toBe(' Total Confirmed ');
  // });
 
  it('data from service to be shown', () => {
    expect(usersService).toBeTruthy();
    
    
    console.log(component.Confirmed);
    
    
    
    
  });
 
  
 
});