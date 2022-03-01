import { Localstorage } from './LocalStorage.Service';
import { UsuarioService } from './../service/usuario.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../model/usuario';
import { Respuesta } from '../model/respuesta';

@Injectable({
    providedIn: 'root'
})
export class LoginClientService {

    private clientLogued: Usuario = new Usuario;
    private clientOn = new BehaviorSubject<Usuario>(new Usuario);
    clientOn$ = this.clientOn.asObservable();
    private validateClientOn: Boolean = false;
    private UserAdmin: Boolean = false

    constructor(private userService: UsuarioService,
        private router: Router,
        private localStorage: Localstorage) { }

    loginClient(email: string, password: string) {
        this.userService.login(email, password).subscribe((
            res: Respuesta) => {
            this.clientLogued = res.objeto_respuesta[0];
            Swal.fire({
                icon: 'success',
                title: 'Bienvenido ' + this.clientLogued.nombres,
                showConfirmButton: false,
                timer: 1500
            });
            this.clientOn.next(this.clientLogued);
            this.validateClientOn = true;
            
            this.localStorage.set("usuario", this.clientLogued)
            this.router.navigate(['/home']);
            this.isAdmin()
        })
    }

    getInfoClient() {
        return this.clientLogued;
    }

    getValidateClientOn() {
        return this.validateClientOn
    }
    getUserAdmin(){
        return this.UserAdmin
    }
    getLocalStorage() {
        if (this.localStorage.get() !== null) {
            this.clientLogued = this.localStorage.get();
            this.clientOn.next(this.clientLogued);
            this.validateClientOn = true;
            this.isAdmin();
        } else {
            this.clientLogued = new Usuario;
            this.clientLogued.tipo_usuario[0].id = 1;
            this.clientOn.next(this.clientLogued);
            this.validateClientOn = false;
            this.localStorage.clear();
        }
    }
    closeSesionClient() {
        this.localStorage.clear();
        this.validateClientOn = false;
        this.clientLogued = new Usuario;
        this.clientOn.next(this.clientLogued);
        this.UserAdmin = false
        window.location.reload();
        
    }

    isAdmin(){
        this.clientLogued.tipo_usuario.forEach(element => {
            if (element.id == 2) {
                this.UserAdmin = true;
                console.log(this.UserAdmin);        
            }
        });
    }
}