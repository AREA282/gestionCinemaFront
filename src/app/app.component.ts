import { Component, OnInit } from '@angular/core';
import { LoginClientService } from './observables/LoginClient.Service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cinemaFront';

  constructor(private loginClient: LoginClientService) {
    
  }

  ngOnInit(): void {
    this.loginClient.getLocalStorage();
  }
}
