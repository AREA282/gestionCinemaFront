import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reserva } from 'src/app/model/reserva';
import { Respuesta } from 'src/app/model/respuesta';
import { ReservaService } from 'src/app/service/reserva.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-reservas',
  templateUrl: './get-reservas.component.html',
  styleUrls: ['./get-reservas.component.css']
})
export class GetReservasComponent implements OnInit {

  reservasUser : Reserva[] = [];
  constructor(private router:Router,private reservaService:ReservaService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.cargar();
  }

  alertas(): void {
    Swal.fire({
      title: '¿Seguro que quieres eliminar la reserva?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }


  eliminarReserva(idReserva:Reserva):void{
    Swal.fire({
      title: '¿Seguro que quieres eliminar la reserva?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.reservaService.eliminar(idReserva).subscribe(
          (res) => {
            if (res != null) {
              Swal.fire('Saved!', JSON.stringify("Se elimino la reserva para la pelicula "+ res.pelicula), 'success').then(()=>this.router.navigate(['/home']))
            }
          }
        )
        Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
    
  }

  cargar():void{
    console.log('Hola');    
    this.activatedRoute.params.subscribe(
      e=>{
        let id=e['id'];
        if(id){
          this.reservaService.obtenerIdUser(id).subscribe(
            (res:Respuesta)=>{this.reservasUser=res.objeto_respuesta;
             console.log(res);
                                 
            }
          );
        }
      }
    )
  }
}
