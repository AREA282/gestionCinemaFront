import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Respuesta } from '../model/respuesta';
import { Sala } from '../model/sala';
import { Reserva } from '../model/reserva';
import { Silla } from '../model/silla';


@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private url: String = "http://localhost:8080/api/cinema/reserva/"

  constructor(private http: HttpClient) { }

  create(reserva: Reserva) {
    return this.http.post<Reserva>(this.url + 'crear', reserva);
  }

  obtener(idReserva:number) {
    return this.http.get<Respuesta>(`${this.url}obtener?idReserva=${idReserva}`)
  }

  obtenertodas() {
    return this.http.get<Respuesta>(this.url + 'obtenertodas')
  }

  obtenerIdUser(idUser: number) {
    return this.http.get<Respuesta>(`${this.url}obtener/${idUser}`)
  }
  obtenerIdPelicula(idPelicula: number) {
    return this.http.get<Respuesta>(`${this.url}obtenerByPelicula?idPelicula=${idPelicula}`)
  }

  eliminar(reserva: Reserva) {
    return this.http.delete<Reserva>(this.url + `eliminar?idReserva=${reserva.id}`);
  }

  modificarReserva(reserva: Reserva) {
    return this.http.put<Reserva>(this.url + 'modificar', reserva)
  }
}