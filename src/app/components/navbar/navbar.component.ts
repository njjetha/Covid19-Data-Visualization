import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  
  constructor(private logger: NGXLogger) { 
    this.logger.debug('Navbar Component working correctly');
  }
 

  ngOnInit(): void {
  }

}
