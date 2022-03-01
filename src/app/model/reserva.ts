import { Usuario } from "../model/usuario";
import { Sala } from "./sala";
import { Silla } from "./silla";


    export class Reserva {
        id:number = 0 ;
        hora:String = "";
        pelicula:String = "";
        silla:Silla[] = [];
        sala:Sala = new Sala;
        usuario:Usuario = new Usuario;   
      
    }