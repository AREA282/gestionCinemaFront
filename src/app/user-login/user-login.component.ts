import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { debounceTime} from 'rxjs/operators';
import { Router } from '@angular/router';
import { Usuario } from '../model/usuario';
import { UsuarioService } from '../service/usuario.service';
import { Respuesta } from '../model/respuesta';
import { LoginClientService } from '../observables/LoginClient.Service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  
  constructor(private usuarioService:UsuarioService, private router:Router, private loginclient:LoginClientService) { 
  }

  ngOnInit(): void {
  }
      usuarioLogueado!:Usuario;
      correo= new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)])
      password= new FormControl('', [Validators.required, Validators.pattern(/^[A-Z]+[a-z]+[0-9]+[!#$%&'*+/=?^_`{|}~-]/)])
      id: number = 0;  

  login():void {
    const valuecorreo = this.correo.value;
    const valuepassword = this.password.value;
    this.loginclient.loginClient(valuecorreo,valuepassword);
  }
}
