import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Usuario } from '../model/usuario';
import { Observable } from 'rxjs';
import { Respuesta } from '../model/respuesta';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url:String="http://localhost:8080/api/cinema/usuario/"

  constructor( private http:HttpClient ) { }

  register(user:Usuario){
    return this.http.post<Respuesta>(this.url + 'crear', user);
  }

  login(correo: string, password: string) {
    return this.http.get<Respuesta>(this.url + `login?correo=${correo}&password=${password}`, )
  }

  ObtenerTipoUsuario(){
    return this.http.get<Respuesta>(`http://localhost:8080/api/cinema/tipousuario/obtener`)
  }

}
