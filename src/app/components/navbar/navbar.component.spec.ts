import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { TableModule } from 'primeng/table';
import { DataServiceService } from 'src/app/services/data-service.service';
 
import { NavbarComponent } from './navbar.component';
 
describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let usersService:DataServiceService;
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      providers:[DataServiceService],
      imports:[HttpClientTestingModule,Ng2GoogleChartsModule,TableModule]
     
    })
    .compileComponents();
    usersService = TestBed.get(DataServiceService); // Add this
  });
 
  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});