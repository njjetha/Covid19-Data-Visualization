import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountriesComponent } from './components/countries/countries.component';
import { HomeComponent } from './components/home/home.component';
import { StatesComponent } from './components/states/states.component';
// import { Ng2GoogleChartsModule, GoogleChartsSettings } from 'ng2-google-charts';

const routes: Routes = [
  {path:'',component:HomeComponent },
  {path:'countries',component:CountriesComponent},
  {path:'states',component:StatesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
