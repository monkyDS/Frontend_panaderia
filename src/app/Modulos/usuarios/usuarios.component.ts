import { Component } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {

  usuarios: any;
  id_usuario: any;

  toggleMostrarClave(item: any) {
    item.mostrarClave = !item.mostrarClave;
}

  obj_usuarios = {
    nombre: "",
    celular: 0,
    email: "",
    clave: "",
    tipo_usuario: "",
  }
  Validar_nombre=true;
  Validar_celular=true;
  Validar_email=true;
  Validar_clave=true;
  Validar_tipo_usuario=true;
  mform=false;
  botones_form = false;

  constructor(private susuario:UsuariosService){}

  ngOnInit() : void{
    this.consulta();
  }

  consulta(){
    this.susuario.consultar().subscribe((resultado:any) => {
      this.usuarios = resultado;
    })
  }

  mostrar_form(dato: any){
    switch(dato){
      case "ver":
        this.mform = true;
      break;    
      case "no ver":
        this.mform = false;
        this.botones_form = false
      break;  
    }
  }

  limpiar(){
    this.obj_usuarios = {
      nombre: "",
      celular: 0,
      email: "",
      clave: "",
      tipo_usuario: "",
    }
  }

  validar(funcion: any){
    if(this.obj_usuarios.nombre === ""){
      this.Validar_nombre = false;
    }else{
      this.Validar_nombre = true;
    }

    if(this.obj_usuarios.celular === 0){
      this.Validar_celular = false;
    }else{
      this.Validar_celular = true;
    }

    if(this.obj_usuarios.email === ""){
      this.Validar_email = false;
    }else{
      this.Validar_email = true;
    }

    if(this.obj_usuarios.clave === ""){
      this.Validar_clave = false;
    }else{
      this.Validar_clave = true;
    }

    if(this.obj_usuarios.tipo_usuario === ""){
      this.Validar_tipo_usuario = false;
    }else{
      this.Validar_tipo_usuario = true;
    }

    if(this.Validar_nombre==true && this.Validar_celular && this.Validar_email && this.Validar_clave &&this.Validar_tipo_usuario && funcion == 'guardar'){
      this.guardar();
    }

    if(this.Validar_nombre==true && this.Validar_celular && this.Validar_email && this.Validar_clave &&this.Validar_tipo_usuario && funcion == 'editar'){
      this.editar();
    }
  }

  guardar(){
    this.susuario.insertar(this.obj_usuarios).subscribe((datos:any) => {
      if(datos['resultado']== 'OK'){
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('no ver');
  }

  eliminar(id:number){

    Swal.fire({
      title: "¿Esta seguro que desea eliminar el usuario?",
      text: "Este proceso no sera reversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        ///////////////
        this.susuario.eliminar(id).subscribe((datos:any) => {
          if(datos['resultado'] == 'OK'){
            this.consulta();
          }
        })
        //////////////
        Swal.fire({
          title: "Usuario Eliminado!",
          text: "El usuario ah sido eliminado.",
          icon: "success"
        });
      }
    });

  }

  cargar_datos(items : any, id: number){

    this.obj_usuarios = {
      nombre: items.nombre,
      celular: items.celular,
      email: items.email,
      clave: items.clave,
      tipo_usuario: items.tipo_usuario,
    }
    this.id_usuario = id;

    this.botones_form = true;
    this.mostrar_form('ver')

  }

  editar(){
    this.susuario.editar(this.id_usuario, this.obj_usuarios).subscribe((datos:any) => {
      if(datos['resultado']== "OK"){
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('no ver');
  }
}

