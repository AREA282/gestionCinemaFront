import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { LoginClientService } from 'src/app/observables/LoginClient.Service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  loguedUser: Usuario = new Usuario;
  userOn: Boolean = false;
  userAdmin: Boolean = false;

  constructor(private loginClient: LoginClientService, private router:Router) { }

  ngOnInit(): void {
    this.validateClientOn();
  }

  validateClientOn() {
    this.userOn = this.loginClient.getValidateClientOn();
    this.loguedUser = this.loginClient.getInfoClient();
    this.userAdmin = this.loginClient.getUserAdmin();
  }
  clientOff() {
    this.router.navigate(['/home']);
    this.loginClient.closeSesionClient();
  }


}
