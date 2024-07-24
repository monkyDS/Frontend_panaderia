import { Component } from '@angular/core';
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
  proveedor: any;
  cliente: any;
  usuarios: any;
  id_ventas: any;
  obj_ventasa: any;

  obj_ventas = {
    fecha: "",
    fo_cliente: 0,
    fo_productos: 0,
    fo_proveedor: 0,
    cantidad: "",
    precios: "",
    iva: "",
    subtotales: "",
    total: "",
    fo_usuario: 0,
  }

  Validar_fecha=true;
  Validar_fo_cliente=true;
  Validar_fo_productos=true;
  Validar_fo_proveedor=true;
  Validar_cantidad=true;
  Validar_precios=true;
  Validar_iva=true;
  Validar_subtotales=true;
  Validar_total=true;
  Validar_fo_usuario=true;
  mform=false;
  botones_form = false;

  constructor(private sventas:VentasService ,private scliente:ClienteService, private sproductos:ProductosService, private sproveedor:ProveedorService, private susuarios:UsuariosService ) {}

  ngOnInit(): void {
    this.consulta();
    this.consulta_cli();
    this.consulta_p();
    this.consulta_pro();
    this.consulta_usu();
  }
  
  consulta() {
    this.sventas.consultar().subscribe((resultado: any) => {
      this.ventas = resultado;
    });
  }
  
  consulta_cli() {
    this.scliente.consultar().subscribe((resultado: any) => {
      this.cliente = resultado;
    });
  }
  
  consulta_p() {
    this.sproductos.consultar().subscribe((resultado: any) => {
      this.productos = resultado;
    });
  }
  
  consulta_pro() {
    this.sproveedor.consultar().subscribe((resultado: any) => {
      this.proveedor = resultado;
    });
  }
  
  consulta_usu() {
    this.susuarios.consultar().subscribe((resultado: any) => {
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
    this.obj_ventas = {
      fecha: "",
      fo_cliente: 0,
      fo_productos: 0,
      fo_proveedor: 0,
      cantidad: "",
      precios: "",
      iva: "",
      subtotales: "",
      total: "",
      fo_usuario: 0,
    }
  }

  validar(funcion: any){
    if(this.obj_ventas.fecha === ""){
      this.Validar_fecha = false;
    }else{
      this.Validar_fecha = true;
    }

    if(this.obj_ventas.fo_cliente === 0){
      this.Validar_fo_cliente = false;
    }else{
      this.Validar_fo_cliente = true;
    }

    if(this.obj_ventas.fo_productos === 0){
      this.Validar_fo_productos = false;
    }else{
      this.Validar_fo_productos = true;
    }

    if(this.obj_ventas.fo_proveedor === 0){
      this.Validar_fo_proveedor = false;
    }else{
      this.Validar_fo_proveedor = true;
    }

    if(this.obj_ventas.cantidad === ""){
      this.Validar_cantidad = false;
    }else{
      this.Validar_cantidad = true;
    }

    if(this.obj_ventas.precios === ""){
      this.Validar_precios = false;
    }else{
      this.Validar_precios = true;
    }

    if(this.obj_ventas.iva === ""){
      this.Validar_iva = false;
    }else{
      this.Validar_iva = true;
    }

    if(this.obj_ventas.subtotales === ""){
      this.Validar_subtotales = false;
    }else{
      this.Validar_subtotales = true;
    }

    if(this.obj_ventas.total === ""){
      this.Validar_total = false;
    }else{
      this.Validar_total = true;
    }

    if(this.obj_ventas.fo_usuario === 0){
      this.Validar_fo_usuario = false;
    }else{
      this.Validar_fo_usuario = true;
    }

    if(this.Validar_fecha==true && this.Validar_fo_cliente && this.Validar_fo_productos && this.Validar_fo_proveedor && this.Validar_cantidad && this.Validar_precios && this.Validar_iva && this.Validar_subtotales && this.Validar_total && this.Validar_fo_usuario && funcion == 'guardar'){
      this.guardar();
    }

    if(this.Validar_fecha==true && this.Validar_fo_cliente && this.Validar_fo_productos && this.Validar_fo_proveedor && this.Validar_cantidad && this.Validar_precios && this.Validar_iva && this.Validar_subtotales && this.Validar_total && this.Validar_fo_usuario && funcion == 'editar'){
      this.editar();
    }
  }

  guardar(){
    this.sventas.insertar(this.obj_ventas).subscribe((datos:any) => {
      if(datos['resultado']== 'OK'){
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('no ver');
  }

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

  cargar_datos(items : any, id: number) {
    this.obj_ventas = {
      fecha: items.fecha,
      fo_cliente: items.fo_cliente,
      fo_productos: items.fo_productos,
      fo_proveedor: items.fo_proveedor,
      cantidad: items.cantidad,
      precios: items.precios,
      iva: items.iva,
      subtotales: items.subtotales,
      total: items.total,
      fo_usuario: items.fo_usuario,
    }
    this.id_ventas = id;
  
    this.botones_form = true;
    this.mostrar_form('ver')
  }

  editar(){
    this.sventas.editar(this.id_ventas, this.obj_ventas).subscribe((datos:any) => {
      if(datos['resultado']== "OK"){
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('no ver');
  }

  printInvoice() {
    window.print();
  }

  cancelInvoice() {
    const invoiceContainer = document.getElementById('invoice-container');
    if (invoiceContainer) {
      invoiceContainer.style.display = 'none';
    }
  }

  imprimir(id: number) {
    const venta = this.ventas.find((item: any) => item.id_ventas === id);

    if (!venta) {
      console.error('Venta no encontrada');
      return;
    }

    // Actualiza los datos de la factura
    document.getElementById('invoice-number-display')!.textContent = id.toString();
    document.getElementById('date-display')!.textContent = venta.fecha;
    document.getElementById('due-date-display')!.textContent = 'No definido'; // Cambia esto según tus necesidades
    document.getElementById('company-name-display')!.textContent = 'Nombre de la Empresa: Delicias Del Horno.'; // Cambia esto según tus necesidades
    document.getElementById('company-address-display')!.textContent = 'Dirección de la Empresa: Bogota.'; // Cambia esto según tus necesidades
    document.getElementById('client-name-display')!.textContent = venta.cliente // Cambia esto según tus necesidades
    document.getElementById('client-address-display')!.textContent = 'Dirección del Cliente: Bogota'; // Cambia esto según tus necesidades
    document.getElementById('product-1-display')!.textContent = venta.productos; // Cambia esto según tus necesidades
    document.getElementById('brand-1-display')!.textContent = 'Marca del Producto'; // Cambia esto según tus necesidades
    document.getElementById('provider-1-display')!.textContent = 'Proveedor del Producto'; // Cambia esto según tus necesidades
    document.getElementById('quantity-1-display')!.textContent = venta.cantidad;
    document.getElementById('price-1-display')!.textContent = venta.precios;
    document.getElementById('subtotal-display')!.textContent = venta.subtotales;
    document.getElementById('iva-display')!.textContent = venta.iva;
    document.getElementById('total-display')!.textContent = venta.total;
    document.getElementById('seller-display')!.textContent = venta.usuarios;

    document.getElementById('invoice-container')!.style.display = 'block';

  }
}
