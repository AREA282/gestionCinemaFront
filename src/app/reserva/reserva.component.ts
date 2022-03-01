import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Pelicula } from '../model/pelicula';
import { Reserva } from '../model/reserva';
import { Respuesta } from '../model/respuesta';
import { Sala } from '../model/sala';
import { Silla } from '../model/silla';
import { Usuario } from '../model/usuario';
import { LoginClientService } from '../observables/LoginClient.Service';
import { PeliculaService } from '../service/pelicula.service';
import { ReservaService } from '../service/reserva.service';
import { SalaService } from '../service/sala.service';
import { SillaService } from '../service/silla.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

  peliculaCon: Pelicula = new Pelicula;
  sala: Sala = new Sala;
  sillas: Silla[] = [];
  sillasReserva: Silla[] = [];
  sillasModificar: Silla[] = []
  valorTotal: number = 0
  reserva: Reserva = new Reserva();

  loguedUser: Usuario = new Usuario;
  userOn: Boolean = false;
  userAdmin: Boolean = false;

  constructor(private reservaService: ReservaService,
              private peliculaService: PeliculaService,
              private salaService: SalaService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private loginClient:LoginClientService) {

  }

  form!: FormGroup;

  ngOnInit(): void {
    this.buildForm();
    this.cargarPelicula();
    this.cargarSala();
    this.validateClientOn();
    this.cargarReserva();
  }

  private buildForm() {
    this.form = new FormGroup({
      id: new FormControl(''),
      sillas: new FormControl(''),
      sala: new FormControl(''),
      usuario: new FormControl('')
    });

    this.form.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(value => {
        console.log(value);
      });
  }

  create(): void {
    this.reserva.sala = this.sala
    this.reserva.silla = this.sillasReserva
    this.reserva.usuario = this.loguedUser
    console.log(this.reserva);
    Swal.fire({
      title: '¿Seguro que quieres hacer la reserva?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si, reservar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.reservaService.create(this.reserva).subscribe(
          (res) => {
            if (res != null) {
              Swal.fire('Saved!', JSON.stringify("Se hizo la reserva para la pelicula " + res.pelicula), 'success').then(() => this.router.navigate(['/reservasUsur/'+this.loguedUser.id]))
            }
          }
        )
        Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  reservarSilla(idsilla: Silla): void {
    if (idsilla.estadoSilla == true) {
      this.sillasReserva.push({
        id: idsilla.id, estadoSilla: idsilla.estadoSilla, numeroSilla: idsilla.numeroSilla, idSala: idsilla.idSala
      })
      this.valorTotal = this.valorTotal + (this.peliculaCon.precio * 1)

    }
    if (this.sillasModificar.find(x => x.id == idsilla.id)) {
      this.sillasModificar.splice(this.sillasModificar.findIndex(x => x.id == idsilla.id), 1);
    }
    idsilla.estadoSilla = false
  }

  desmarcarSilla(idsilla: Silla): void {
    if (this.sillasReserva.find(x => x.id == idsilla.id)) {
      this.sillasReserva.splice(this.sillasReserva.findIndex(x => x.id == idsilla.id), 1);
      this.valorTotal = this.valorTotal - (this.peliculaCon.precio * 1)
      this.sillasModificar.push( {id: idsilla.id, estadoSilla: idsilla.estadoSilla, numeroSilla: idsilla.numeroSilla, idSala: idsilla.idSala})
      idsilla.estadoSilla = true
    }

  }


  cargarPelicula(): void {
    this.activatedRoute.params.subscribe(
      e => {
        let id = e['id'];
        if (id) {
          this.peliculaService.obtenerPelicula(id).subscribe(
            (res: Respuesta) => {
              this.peliculaCon = res.objeto_respuesta[0];

            }
          );
        }
      }
    )
  }

  cargarSala(): void {
    this.activatedRoute.params.subscribe(
      e => {
        let id = e['id'];
        if (id) {
          this.salaService.obtenerSalaPelicula(id).subscribe(
            (res: Respuesta) => {
              this.sala = res.objeto_respuesta[0];
              this.salaService.obtenerSillas(this.sala.id).subscribe(
                (res: Respuesta) => {
                  this.sillas = res.objeto_respuesta; console.log(this.sillas);
                  this.sillas = this.sillas.sort((a: Silla, b: Silla) => a.numeroSilla - b.numeroSilla)
                }
              );
            }
          );
        }
      }
    )
  }

  cargarReserva(): void {
    this.activatedRoute.params.subscribe(
      e => {
        let idReserva = e['idReserva'];
        if (idReserva) {
          this.reservaService.obtener(idReserva).subscribe(
            (res: Respuesta) => {
              this.reserva = res.objeto_respuesta[0];
              this.sillasReserva = this.reserva.silla
              this.sillasReserva.forEach(element => {
                this.valorTotal += (this.reserva.sala.pelicula.precio *1)
              });
              console.log("hola");
              console.log(this.reserva);             
            }
          );
        }
      }
    )
  }

  modificar(): void {
    this.reserva.sala = this.sala
    this.reserva.silla = this.sillas
    this.reserva.usuario = this.loguedUser
    console.log(this.reserva);
    Swal.fire({
      title: '¿Seguro que quieres hacer la reserva?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si, reservar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.reservaService.modificarReserva(this.reserva).subscribe(
          (res) => {
            if (res != null) {
              Swal.fire('Saved!', JSON.stringify("Se Modifico la reserva para la pelicula " + this.peliculaCon.titulo), 'success').then(() => this.router.navigate(['/reservasUsur/'+this.loguedUser.id]))
            }
          }
        )
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
