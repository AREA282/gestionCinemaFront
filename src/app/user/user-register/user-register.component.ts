import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoUsuario, Usuario } from '../../model/usuario';
import { UsuarioService } from '../../service/usuario.service';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { debounceTime} from 'rxjs/operators';
import { Respuesta } from 'src/app/model/respuesta';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  usuarioN!:Usuario;
  form!: FormGroup;
  tipo:TipoUsuario[] = []
  TipoUsuario:TipoUsuario[] = []
  constructor(private usuarioService:UsuarioService, private router:Router)  {
    this.buildForm();
   }

  ngOnInit():void {
    this.getTipousuario();
  }

  private buildForm() {
    this.form = new FormGroup({
      id: new FormControl('', [Validators.required]),
      correo: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)]),
      password:new FormControl('', [Validators.required, Validators.pattern(/^[A-Z]+[a-z]+[0-9]+[!#$%&'*+/=?^_`{|}~-]/)]),
      nombres: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      apellidos: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      documento: new FormControl('', [Validators.required]),
      tipo_documento: new FormControl('', [Validators.required]),
      tipo_usuario: new FormControl('', [Validators.required])
    });

    this.form.valueChanges
    .pipe(
      debounceTime(500)
    )
    .subscribe(value => {
      console.log(value);
    });
  }

  create():void {
  
    const value = this.form.value;
    this.usuarioN = value
    this.tipo.push({
      id: value.tipo_usuario, tipo:''  
    })
    this.usuarioN.tipo_usuario = this.tipo
    console.log(this.usuarioN);
    
    this.usuarioService.register(value).subscribe(
      (res:Respuesta) => console.log(res.descripcion)
    )
  }

  public getTipousuario(){
    this.usuarioService.ObtenerTipoUsuario().subscribe((res:any)=>{this.TipoUsuario=res; console.log(res);
    
    })
  }
  
}
