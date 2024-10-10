import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { ProductosService } from 'src/app/servicios/productos.service';
import { ProveedorService } from 'src/app/servicios/proveedor.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { VentasService } from 'src/app/servicios/ventas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent {

  ventas: any;
  productos: any;
  cliente: any;
  usuarios: any;
  id_ventas: any;
  modal = false;
  iva: number = 0.19;
  total: any;
  factura = false;
 
  constructor(private router:Router,private sventas:VentasService, private susuarios:UsuariosService) {}

  ngOnInit(): void {
    this.consulta();
  }

  insertar(){
    this.router.navigate(['ventasins']);
  }
  
  consulta() {
    this.sventas.consultar().subscribe((resultado: any) => {
      this.ventas = resultado;
    });
  }
  
  consultap(id: number) {
    this.sventas.consultarp(id).subscribe((resultado: any) => {
      this.productos = resultado;

      this.total=0;
      for(let i=0; i<this.productos.length; i++){
        this.total = this.total + this.productos[i][4];
      }

    });
  }

  consulta_usu(){
    this.susuarios.consultar().subscribe((resultado:any) => {
      this.usuarios = resultado;
    })
  }

  mostrar_modal(dato: any, id: number){
    switch(dato){
      case 0:
        this.modal = false;
      break;
      case 1:
        this.modal = true;
        this.consultap(id);
      break;
    }
  }

  //mostrar_form(dato: any){
  //  switch(dato){
  //    case "ver":
  //      this.mform = true;
  //    break;    
  //    case "no ver":
  //      this.mform = false;
  //      this.botones_form = false
  //    break;  
  //  }
  //}

  //limpiar(){
    //this.obj_ventas = {
      //fecha: "",
      //fo_cliente: 0,
      //fo_productos: 0,
      //fo_proveedor: 0,
      //cantidad: "",
      //precios: "",
      //iva: "",
      //subtotales: "",
      //total: "",
      //fo_usuario: 0,
    //}
  //}

  //validar(funcion: any){
  //  if(this.obj_ventas.fecha === ""){
  //    this.Validar_fecha = false;
  //  }else{
  //    this.Validar_fecha = true;
  //  }
//
  //  if(this.obj_ventas.fo_cliente === 0){
  //    this.Validar_fo_cliente = false;
  //  }else{
  //    this.Validar_fo_cliente = true;
  //  }
//
  //  if(this.obj_ventas.fo_productos === 0){
  //    this.Validar_fo_productos = false;
  //  }else{
  //    this.Validar_fo_productos = true;
  //  }
//
  //  if(this.obj_ventas.fo_proveedor === 0){
  //    this.Validar_fo_proveedor = false;
  //  }else{
  //    this.Validar_fo_proveedor = true;
  //  }
//
  //  if(this.obj_ventas.cantidad === ""){
  //    this.Validar_cantidad = false;
  //  }else{
  //    this.Validar_cantidad = true;
  //  }
//
  //  if(this.obj_ventas.precios === ""){
  //    this.Validar_precios = false;
  //  }else{
  //    this.Validar_precios = true;
  //  }
//
  //  if(this.obj_ventas.iva === ""){
  //    this.Validar_iva = false;
  //  }else{
  //    this.Validar_iva = true;
  //  }
//
  //  if(this.obj_ventas.subtotales === ""){
  //    this.Validar_subtotales = false;
  //  }else{
  //    this.Validar_subtotales = true;
  //  }
//
  //  if(this.obj_ventas.total === ""){
  //    this.Validar_total = false;
  //  }else{
  //    this.Validar_total = true;
  //  }
//
  //  if(this.obj_ventas.fo_usuario === 0){
  //    this.Validar_fo_usuario = false;
  //  }else{
  //    this.Validar_fo_usuario = true;
  //  }
//
  //  //if(this.Validar_fecha==true && this.Validar_fo_cliente && this.Validar_fo_productos && this.Validar_fo_proveedor && this.Validar_cantidad && this.Validar_precios && this.Validar_iva && this.Validar_subtotales && this.Validar_total && this.Validar_fo_usuario && funcion == 'guardar'){
  //    //this.guardar();
  //  //}
//
  //  if(this.Validar_fecha==true && this.Validar_fo_cliente && this.Validar_fo_productos && this.Validar_fo_proveedor && this.Validar_cantidad && this.Validar_precios && this.Validar_iva && this.Validar_subtotales && this.Validar_total && this.Validar_fo_usuario && funcion == 'editar'){
  //    this.editar();
  //  }
  //}

  //guardar(){
    //this.sventas.insertar(this.obj_ventas).subscribe((datos:any) => {
      //if(datos['resultado']== 'OK'){
        //this.consulta();
      //}
    //});
    //this.limpiar();
    //this.mostrar_form('no ver');
  //}

  eliminar(id:number){
    Swal.fire({
      title: "¿Esta seguro que desea eliminar el registro de la venta?",
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
        this.sventas.eliminar(id).subscribe((datos:any) => {
          if(datos['resultado'] == 'OK'){
            this.consulta();
          }
        })
        //////////////
        Swal.fire({
          title: "Venta Eliminada!",
          text: "La  venta ah sido eliminado.",
          icon: "success"
        });
      }
    });
  }

  //cargar_datos(items : any, id: number) {
  //  this.obj_ventas = {
  //    fecha: items.fecha,
  //    fo_cliente: items.fo_cliente,
  //    fo_productos: items.fo_productos,
  //    fo_proveedor: items.fo_proveedor,
  //    cantidad: items.cantidad,
  //    precios: items.precios,
  //    iva: items.iva,
  //    subtotales: items.subtotales,
  //    total: items.total,
  //    fo_usuario: items.fo_usuario,
  //  }
  //  this.id_ventas = id;
  //
  //  this.botones_form = true;
  //  this.mostrar_form('ver')
  //}

  //editar(){
  //  this.sventas.editar(this.id_ventas, this.obj_ventas).subscribe((datos:any) => {
  //    if(datos['resultado']== "OK"){
  //      this.consulta();
  //    }
  //  });
  //  this.limpiar();
  //  this.mostrar_form('no ver');
  //}


  mostrarFactura(dato: any, id: number) {
    switch(dato){
      case 0:
        this.factura = false;
      break;
      case 1:
        this.factura = true;
        this.consultap(id); 
      break;
    }
  }  

  imprimirFactura() {
    window.print(); 
  }
}