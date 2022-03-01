import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Respuesta } from 'src/app/model/respuesta';
import { Usuario } from 'src/app/model/usuario';
import { LoginClientService } from 'src/app/observables/LoginClient.Service';
import Swal from 'sweetalert2';
import { Pelicula } from '../../model/pelicula';
import { PeliculaService } from '../../service/pelicula.service';

@Component({
  selector: 'app-infopelicula',
  templateUrl: './infopelicula.component.html',
  styleUrls: ['./infopelicula.component.css']
})
export class InfopeliculaComponent implements OnInit {

  peliculaCon:Pelicula = new Pelicula;

  constructor(private peliculaService:PeliculaService, private activatedRoute:ActivatedRoute, private router:Router, private loginClient:LoginClientService) { }
  loguedUser: Usuario = new Usuario;
  userOn: Boolean = false;
  userAdmin: Boolean = false;


  ngOnInit(): void {
    this.cargar();
    this.validateClientOn();
  }
  cargar():void{
    this.activatedRoute.params.subscribe(
      e=>{
        let id=e['id'];
        if(id){
          this.peliculaService.obtenerPelicula(id).subscribe(
            (res:Respuesta)=>{this.peliculaCon=res.objeto_respuesta[0];
                                 
            }
          );
        }
      }
    )
  }

  reserva(){
    if(this.userOn == true){
      this.router.navigate(['/reserva/' + this.peliculaCon.id])
    }else{
      Swal.fire({
        title: 'No estas logueado?',
        text: "Te redirigiremos para que te registres",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Esta bien'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/register'])
        }
      })
    }
    
  }


  validateClientOn() {
    this.userOn = this.loginClient.getValidateClientOn();
    this.loguedUser = this.loginClient.getInfoClient();
    this.userAdmin = this.loginClient.getUserAdmin();
  }
}
