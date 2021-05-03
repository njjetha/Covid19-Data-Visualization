import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { CountriesComponent } from './countries.component';
import { DataServiceService } from 'src/app/services/data-service.service';

fdescribe('CountriesComponent', () => {
  let component: CountriesComponent;
  let fixture: ComponentFixture<CountriesComponent>;
  let usersService:DataServiceService;
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers:[DataServiceService],
      imports:[HttpClientTestingModule,Ng2GoogleChartsModule ]
    })
    .compileComponents();
    usersService = TestBed.get(DataServiceService); // Add this
  });
 
  beforeEach(() => {
    fixture = TestBed.createComponent(CountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});