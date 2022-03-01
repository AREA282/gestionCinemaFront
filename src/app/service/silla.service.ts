import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Respuesta } from '../model/respuesta';
import { Silla } from '../model/silla';


@Injectable({
  providedIn: 'root'
})
export class SillaService {

  private url:String="http://localhost:8080/api/cinema/silla/"

  constructor( private http:HttpClient ) { }

  create(silla:Silla){
    return this.http.post<Respuesta>(this.url + 'crear', silla);
  }

  obtenerSillas(){
      return this.http.get<Respuesta>(this.url + 'obtenertodas')
  }

  obtenerSillaSala(idSala: number){
    return this.http.get<Respuesta>(`${this.url}consultarSillasSala?idsala=${idSala}`)
  }

  eliminarSilla(idSilla: number){
      return this.http.delete<Respuesta>(this.url +  `eliminar?idsala=${idSilla}`);
  }
  eliminarTodasSilla(idPelicula: number){
    return this.http.delete<Boolean>(this.url +  `eliminarTodas?idPelicula=${idPelicula}`);
}

  modificarSilla(silla: Silla){
      return this.http.put<Respuesta>(this.url + 'modificar', silla)
  }
}