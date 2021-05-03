import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { TableModule } from 'primeng/table';
import { DataServiceService } from 'src/app/services/data-service.service';
import { DashboardCardComponent } from '../dashboard-card/dashboard-card.component';
 
import { StatesComponent } from './states.component';
 
fdescribe('StatesComponent', () => {
  let component: StatesComponent;
  let fixture: ComponentFixture<StatesComponent>;
  let usersService: DataServiceService;
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatesComponent,DashboardCardComponent ],
      providers:[DataServiceService],
      imports:[HttpClientTestingModule,Ng2GoogleChartsModule,TableModule]
    })
    .compileComponents();
    usersService = TestBed.get(DataServiceService); // Add this
  });
  
  beforeEach(() => {
    fixture = TestBed.createComponent(StatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});