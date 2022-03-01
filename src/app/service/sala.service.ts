import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Respuesta } from '../model/respuesta';
import { Sala } from '../model/sala';


@Injectable({
  providedIn: 'root'
})
export class SalaService {

  private url:String="http://localhost:8080/api/cinema/sala/"

  constructor( private http:HttpClient ) { }

  create(sala:Sala){
    return this.http.post<Respuesta>(this.url + 'crear', sala);
  }

  obtenerSalas(){
      return this.http.get<Respuesta>(this.url + 'obtenertodas')
  }

  obtenerSalaPelicula(id: number){
    return this.http.get<Respuesta>(`${this.url}obtenerSala/${id}`)
  }

  obtenerSillas(id:number){
    return this.http.get<Respuesta>(`http://localhost:8080/api/cinema/silla/consultarSillasSala?idSala=${id}`)
  }

  eliminarSala(idsala: number){
      return this.http.delete<Respuesta>(this.url +  `eliminar?idsala=${idsala}`);
  }

  eliminarSalaByPelicula(idPelicula: number){
    return this.http.delete<Respuesta>(this.url +  `eliminarByPelicula?idPelicula=${idPelicula}`);
}

  modificarSala(sala: Sala){
      return this.http.put<Respuesta>(this.url + 'modificar', sala)
  }
}