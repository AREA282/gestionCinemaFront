import { Component, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { Router } from '@angular/router';
import { Respuesta } from 'src/app/model/respuesta';
import { Pelicula, } from '../../../model/pelicula';
import { PeliculaService } from '../../../service/pelicula.service';
import Swal from 'sweetalert2';
import { SalaService } from 'src/app/service/sala.service';
import { SillaService } from 'src/app/service/silla.service';
import { LoginClientService } from 'src/app/observables/LoginClient.Service';
import { Usuario } from 'src/app/model/usuario';
import { ReservaService } from 'src/app/service/reserva.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  public peliculas: Pelicula[] = [];
  loguedUser: Usuario = new Usuario;
  userOn: Boolean = false;
  userAdmin: Boolean = false;
  EliminarPeli:Boolean = false

  constructor(private peliculaService: PeliculaService, private router: Router, private salaService: SalaService, private sillaService: SillaService, private loginClient: LoginClientService, private reservaService: ReservaService) {
  }

  ngOnInit(): void {
    this.getPeliculasService();
    this.validateClientOn();
    console.log(this.userAdmin);

  }

  public getPeliculasService() {
    this.peliculaService.obtenerPeliculas().subscribe((res: Respuesta) => {
      this.peliculas = res.objeto_respuesta;
    })
  }
  
  public deletePelicula(idPelicula: number) { 
     this.reservaService.obtenerIdPelicula(idPelicula).subscribe((res:Respuesta) => { 
       console.log(res.objeto_respuesta);
       
      if(res.objeto_respuesta.length > 0){
        Swal.fire('En esta pelicula hay reservas. Favor validar')  
      }else{
        Swal.fire({
          title: '¿Primero se eliminara la sala. Estas seguro de eliminarla?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Si, eliminar',
        }).then((result) => {
          if (result.isConfirmed) {
            this.sillaService.eliminarTodasSilla(idPelicula).subscribe((res: Boolean) => {
              this.salaService.eliminarSalaByPelicula(idPelicula).subscribe((res) => {
                this.confirmarEliminacionPelicula(idPelicula);
              })
              Swal.fire('Saved!', '', 'success')
            })
          } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
          }
        })
      }
    })
  }


  confirmarEliminacionPelicula(idPelicula: number) {
    this.peliculaService.eliminarPelicula(idPelicula).subscribe(
      (res) => {
        if (res != null) {
          Swal.fire('Saved!', JSON.stringify("Se elimino la pelicula y la sala satisfactoriamente"), 'success').then(() => this.router.navigate(['/home']))
        }
      }
    )
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


  validateClientOn() {
    this.userOn = this.loginClient.getValidateClientOn();
    this.loguedUser = this.loginClient.getInfoClient();
    this.userAdmin = this.loginClient.getUserAdmin();
  }
}
