import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Pelicula } from '../model/pelicula';
import { Observable } from 'rxjs';
import { Respuesta } from '../model/respuesta';


@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  private url:String="http://localhost:8080/api/cinema/pelicula/"

  constructor( private http:HttpClient ) { }

  create(pelicula:Pelicula){
    return this.http.post<Respuesta>(this.url + 'crear', pelicula);
  }

  obtenerPeliculas(){
      return this.http.get<Respuesta>(this.url + 'obtenertodas')
  }

  obtenerPelicula(id: number){
    return this.http.get<Respuesta>(`${this.url}obtener/${id}`)
  }

  eliminarPelicula(idPelicula: number){
      return this.http.delete<Respuesta>(this.url +  `eliminar?idPelicula=${idPelicula}`);
  }

  modificarPelicula(pelicula: Pelicula){
      return this.http.put<Respuesta>(this.url + 'modificar', pelicula)
  }
}