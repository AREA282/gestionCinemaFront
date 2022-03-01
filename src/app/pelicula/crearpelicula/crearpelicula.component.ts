import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pelicula } from '../../model/pelicula';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { PeliculaService } from '../../service/pelicula.service';
import { Respuesta } from 'src/app/model/respuesta';
import { SalaService } from 'src/app/service/sala.service';
import { Sala } from 'src/app/model/sala';
import { SillaService } from 'src/app/service/silla.service';
import { Silla } from 'src/app/model/silla';

@Component({
  selector: 'app-crearpelicula',
  templateUrl: './crearpelicula.component.html',
  styleUrls: ['./crearpelicula.component.css']
})
export class CrearpeliculaComponent implements OnInit {

  salaNueva: Sala = new Sala;
  silla: Silla = new Silla;
  peliculaEditar: Pelicula = new Pelicula;

  constructor(private peliculaService: PeliculaService, private salaService: SalaService, private sillaService: SillaService, private router: Router, private activatedRoute:ActivatedRoute) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.cargar();
  }

  peliculaNueva!: Pelicula;
  form!: FormGroup;

  private buildForm() {
    this.form = new FormGroup({
      id: new FormControl('', [Validators.required]),
      titulo: new FormControl('', [Validators.required]),
      duracion: new FormControl('', [Validators.required]),
      hora: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required]),
      pais: new FormControl('', [Validators.required]),
      genero: new FormControl('', [Validators.required]),
      trailer: new FormControl('', [Validators.required]),
      imagen: new FormControl('', [Validators.required])
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
    const value = this.form.value;
    this.peliculaService.create(value).subscribe(
      (res: Respuesta) => {
        if (res.objeto_respuesta != null) {
          this.salaNueva.pelicula.id = res.objeto_respuesta[0].id
          this.salaService.create(this.salaNueva).subscribe((resSala: Respuesta) => {
            this.crearSillas(resSala.objeto_respuesta[0].id);           
            this.router.navigate(['/home'])
          })
        }
      }
    )
  }

  crearSillas( idSalaSilla:number): void {
    this.silla.idSala.id = idSalaSilla
    for (let index = 0; index <20; index++) {
      this.silla.numeroSilla = index + 1;
      this.sillaService.create(this.silla).subscribe((res:Respuesta) =>{        
      })    
    }
  }

  cargar():void{
    this.activatedRoute.params.subscribe(
      e=>{
        let id=e['id'];
        if(id){
          this.peliculaService.obtenerPelicula(id).subscribe(
            (res:Respuesta)=>{
              this.peliculaEditar = res.objeto_respuesta[0]
              console.log(this.peliculaEditar);
              
              this.form.setValue({id:this.peliculaEditar.id, titulo: this.peliculaEditar.titulo, duracion: this.peliculaEditar.duracion,
              hora:this.peliculaEditar.hora, precio:this.peliculaEditar.precio, pais:this.peliculaEditar.pais, genero:this.peliculaEditar.genero,
              trailer:this.peliculaEditar.trailer,imagen:this.peliculaEditar.imagen
              });
                                 
            }
          );
        }
      }
    )
  }
}
