import { Component } from '@angular/core';
import { ComprasService } from 'src/app/servicios/compras.service';
import { ProductosService } from 'src/app/servicios/productos.service';
import { ProveedorService } from 'src/app/servicios/proveedor.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss']
})
export class ComprasComponent {

  compras: any;
  productos: any;
  proveedor: any;
  usuarios: any;
  id_compras: any;

  obj_compras = {
    fecha: "",
    fo_productos: 0,
    fo_proveedor: 0,
    cantidad: "",
    iva: "",
    subtotales: "",
    total: "",
    fo_usuario: 0,
  }

  Validar_fecha=true;
  Validar_fo_productos=true;
  Validar_fo_proveedor=true;
  Validar_cantidad=true;
  Validar_iva=true;
  Validar_subtotales=true;
  Validar_total=true;
  Validar_fo_usuario=true;
  mform=false;
  botones_form = false;

  constructor(private scompras:ComprasService, private sproductos:ProductosService, private sproveedor:ProveedorService, private susuarios:UsuariosService ) {}

  ngOnInit() : void{
    this.consulta();
    this.consulta_p();
    this.consulta_pro();
    this.consulta_usu();
  }

  
  consulta(){
    this.scompras.consultar().subscribe((resultado:any) => {
      this.compras = resultado;
    });
  }

  consulta_p(){
    this.sproductos.consultar().subscribe((resultado:any) => {
      this.productos = resultado;
    });
  }

  consulta_pro(){
    this.sproveedor.consultar().subscribe((resultado:any) => {
      this.proveedor = resultado;
    });
  }

  consulta_usu(){
    this.susuarios.consultar().subscribe((resultado:any) => {
      this.usuarios = resultado;
    });
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
    this.obj_compras = {
      fecha: "",
      fo_productos: 0,
      fo_proveedor: 0,
      cantidad: "",
      iva: "",
      subtotales: "",
      total: "",
      fo_usuario: 0,
    }
  }
  validar(funcion: any){
    if(this.obj_compras.fecha === ""){
      this.Validar_fecha = false;
    }else{
      this.Validar_fecha = true;
    }

    if(this.obj_compras.fo_productos === 0){
      this.Validar_fo_productos = false;
    }else{
      this.Validar_fo_productos = true;
    }

    if(this.obj_compras.fo_proveedor === 0){
      this.Validar_fo_proveedor = false;
    }else{
      this.Validar_fo_proveedor = true;
    }

    if(this.obj_compras.cantidad === ""){
      this.Validar_cantidad = false;
    }else{
      this.Validar_cantidad = true;
    }

    if(this.obj_compras.iva === ""){
      this.Validar_iva = false;
    }else{
      this.Validar_iva = true;
    }

    if(this.obj_compras.subtotales === ""){
      this.Validar_subtotales = false;
    }else{
      this.Validar_subtotales = true;
    }

    if(this.obj_compras.total === ""){
      this.Validar_total = false;
    }else{
      this.Validar_total = true;
    }

    if(this.obj_compras.fo_usuario === 0){
      this.Validar_fo_usuario = false;
    }else{
      this.Validar_fo_usuario = true;
    }

    if(this.Validar_fecha==true && this.Validar_fo_productos && this.Validar_fo_proveedor && this.Validar_cantidad && this.Validar_iva && this.Validar_subtotales && this.Validar_total && this.Validar_fo_usuario && funcion == 'guardar'){
      this.guardar();
    }

    if(this.Validar_fecha==true && this.Validar_fo_productos && this.Validar_fo_proveedor && this.Validar_cantidad && this.Validar_iva && this.Validar_subtotales && this.Validar_total && this.Validar_fo_usuario && funcion == 'editar'){
      this.editar();
    }
  }

  guardar(){
    this.scompras.insertar(this.obj_compras).subscribe((datos:any) => {
      if(datos['resultado']== 'OK'){
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('no ver');
  }

  eliminar(id:number){
    Swal.fire({
      title: "¿Esta seguro que desea eliminar el registro de la compra?",
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
        this.scompras.eliminar(id).subscribe((datos:any) => {
          if(datos['resultado'] == 'OK'){
            this.consulta();
          }
        })
        //////////////
        Swal.fire({
          title: "Venta Eliminada!",
          text: "La  compra ah sido eliminado.",
          icon: "success"
        });
      }
    });
  }

  cargar_datos(items : any, id: number){

    this.obj_compras = {
      fecha: items.fecha,
      fo_productos: items.fo_productos,
      fo_proveedor: items.fo_proveedor,
      cantidad: items.cantidad,
      iva: items.iva,
      subtotales: items.subtotales,
      total: items.total,
      fo_usuario: items.fo_usuario,
    }
    this.id_compras = id;

    this.botones_form = true;
    this.mostrar_form('ver')
  }

  editar(){
    this.scompras.editar(this.id_compras, this.obj_compras).subscribe((datos:any) => {
      if(datos['resultado'] == "OK"){
        this.consulta();
        Swal.fire('Editado!', 'La compra ha sido editada.', 'success');
      } else {
        Swal.fire('Error!', datos['mensaje'], 'error');
      }
    });
    this.limpiar();
    this.mostrar_form('no ver');
}

}
