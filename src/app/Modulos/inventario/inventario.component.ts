import { Component } from '@angular/core';
import { InventarioService } from 'src/app/servicios/inventario.service';
import { MarcaService } from 'src/app/servicios/marca.service';
import { ProductosService } from 'src/app/servicios/productos.service';
import { ProveedorService } from 'src/app/servicios/proveedor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class InventarioComponent {

  inventario: any;
  productos: any;
  proveedor: any;
  marca: any;
  id_inventario: any;

  obj_inventario = {
    fecha: "",
    fo_productos: 0,
    fo_proveedor: 0,
    cantidades: "",
    nombre: "",
    fo_marca: 0,
    codigo: "",
    stoock: 0,
  }
  
  Validar_fecha=true;
  Validar_fo_productos=true;
  Validar_fo_proveedor=true;
  Validar_cantidades=true;
  Validar_nombre=true;
  Validar_fo_marca=true;
  Validar_codigo=true;
  Validar_stoock=true;
  mform=false;
  botones_form = false;


  constructor(private sinventario:InventarioService, private sproductos:ProductosService, private sproveedor:ProveedorService, private smarca:MarcaService){}

  ngOnInit() : void{
    this.consulta();
    this.consulta_p();
    this.consulta_pro();
    this.consulta_arca();
  }

  consulta(){
    this.sinventario.consultar().subscribe((resultado:any) => {
      this.inventario = resultado;
    })
  }

  consulta_p(){
    this.sproductos.consultar().subscribe((resultado:any) => {
      this.productos = resultado;
    })
  }

  consulta_pro(){
    this.sproveedor.consultar().subscribe((resultado:any) => {
      this.proveedor = resultado;
    })
  }

  consulta_arca(){
    this.smarca.consultar().subscribe((resultado:any) => {
      this.marca = resultado;
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
    this.obj_inventario = {
    fecha: "",
    fo_productos: 0,
    fo_proveedor: 0,
    cantidades: "",
    nombre: "",
    fo_marca: 0,
    codigo: "",
    stoock: 0,
    }
  }

  validar(funcion: any){
    if(this.obj_inventario.fecha === ""){
      this.Validar_fecha = false;
    }else{
      this.Validar_fecha = true;
    }

    if(this.obj_inventario.fo_productos === 0){
      this.Validar_fo_productos = false;
    }else{
      this.Validar_fo_productos = true;
    }

    if(this.obj_inventario.fo_proveedor === 0){
      this.Validar_fo_proveedor = false;
    }else{
      this.Validar_fo_proveedor = true;
    }

    if(this.obj_inventario.cantidades === ""){
      this.Validar_cantidades = false;
    }else{
      this.Validar_cantidades = true;
    }

    if(this.obj_inventario.nombre === ""){
      this.Validar_nombre = false;
    }else{
      this.Validar_nombre = true;
    }

    if(this.obj_inventario.fo_marca === 0){
      this.Validar_fo_marca = false;
    }else{
      this.Validar_fo_marca = true;
    }

    if(this.obj_inventario.codigo === ""){
      this.Validar_codigo = false;
    }else{
      this.Validar_codigo = true;
    }

    if(this.obj_inventario.stoock === 0){
      this.Validar_stoock = false;
    }else{
      this.Validar_stoock = true;
    }

    if(this.Validar_fecha==true && this.Validar_fo_productos && this.Validar_fo_proveedor && this.Validar_cantidades && this.Validar_nombre && this.Validar_fo_marca && this.Validar_codigo && this.Validar_stoock && funcion == 'guardar'){
      this.guardar();
    }

    if(this.Validar_fecha==true && this.Validar_fo_productos && this.Validar_fo_proveedor && this.Validar_cantidades && this.Validar_nombre && this.Validar_fo_marca && this.Validar_codigo && this.Validar_stoock && funcion == 'editar'){
      this.editar();
    }
  }

  guardar(){
    this.sinventario.insertar(this.obj_inventario).subscribe((datos:any) => {
      if(datos['resultado']== 'OK'){
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('no ver');
  }

  eliminar(id:number){
    Swal.fire({
      title: "¿Esta seguro que desea eliminar el inventario?",
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
        this.sinventario.eliminar(id).subscribe((datos:any) => {
          if(datos['resultado'] == 'OK'){
            this.consulta();
          }
        })
        //////////////
        Swal.fire({
          title: "Inventario Eliminado!",
          text: "El inventario ah sido eliminado.",
          icon: "success"
        });
      }
    });
  }

  cargar_datos(items : any, id: number){

    this.obj_inventario = {
      fecha: items.fecha,
      fo_productos: items.fo_productos,
      fo_proveedor: items.fo_proveedor,
      cantidades: items.cantidades,
      nombre: items.nombre,
      fo_marca: items.fo_marca,
      codigo: items.codigo,
      stoock: items.stoock,
    }
    this.id_inventario = id;

    this.botones_form = true;
    this.mostrar_form('ver')
  }

  editar(){
    this.sinventario.editar(this.id_inventario, this.obj_inventario).subscribe((datos:any) => {
      if(datos['resultado']== "OK"){
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('no ver');
  }

}
