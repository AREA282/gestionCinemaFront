export class Usuario {
    id:number = 0 ;
    correo:String = "";
    password:String = "";
    nombres:String = "";
    apellidos:String = "";
    documento:number = 0;
    tipo_documento:String = "";
    tipo_usuario:TipoUsuario[] = [new TipoUsuario];


}

export class TipoUsuario {
    id:number = 1 ;
    tipo:String = "";



}