import { Component } from '@angular/core';
import { MarcaService } from 'src/app/servicios/marca.service';
import { ProductosService } from 'src/app/servicios/productos.service';
import { ProveedorService } from 'src/app/servicios/proveedor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.scss']
})
export class AdministracionComponent {

  producto: any;
  proveedor: any;
  marca: any;
  id_productos: any;

  obj_productos = {
    nombre: "",
    codigo: "",
    valor_compra: 0,
    valor_venta: 0, 
    stoock: 0,
    fo_proveedor: 0,
    fo_marca: 0,
  }

  Validar_nombre=true;
  Validar_codigo=true;
  Validar_valor_compra=true;
  Validar_valor_venta=true;
  Validar_stoock=true;
  Validar_fo_proveedor=true;
  Validar_fo_marca=true;
  mform=false;
  botones_form = false;

  constructor(private sproductos:ProductosService, private sproveedor:ProveedorService, private smarca:MarcaService) {}

  ngOnInit() : void{
    this.consulta();
    this.consulta_pro();
    this.consulta_arca();
  }

  consulta(){
    this.sproductos.consultar().subscribe((resultado:any) => {
      this.producto = resultado;
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
    this.obj_productos = {
    nombre: "",
    codigo: "",
    valor_compra: 0,
    valor_venta: 0, 
    stoock: 0,
    fo_proveedor: 0,
    fo_marca: 0,
    }
  }

  validar(funcion: any) {
    if (this.obj_productos.nombre === "") {
      this.Validar_nombre = false;
    } else {
      this.Validar_nombre = true;
    }
  
    if (this.obj_productos.codigo === "") {
      this.Validar_codigo = false;
    } else {
      this.Validar_codigo = true;
    }
  
    if (this.obj_productos.valor_compra === 0) {
      this.Validar_valor_compra = false;
    } else {
      this.Validar_valor_compra = true;
    }
  
    if (this.obj_productos.valor_venta === 0) {
      this.Validar_valor_venta = false;
    } else {
      this.Validar_valor_venta = true;
    }
  
    if (this.obj_productos.stoock === 0) {
      this.Validar_stoock = false;
    } else {
      this.Validar_stoock = true;
    }
  
    if (this.obj_productos.fo_proveedor === 0) {
      this.Validar_fo_proveedor = false;
    } else {
      this.Validar_fo_proveedor = true;
    }
  
    if (this.obj_productos.fo_marca === 0) {
      this.Validar_fo_marca = false;
    } else {
      this.Validar_fo_marca = true;
    }
  
    if (this.Validar_nombre && this.Validar_codigo && this.Validar_valor_compra && this.Validar_valor_venta && this.Validar_stoock && this.Validar_fo_proveedor && this.Validar_fo_marca && funcion == 'guardar') {
      this.guardar();
    }
  
    if (this.Validar_nombre && this.Validar_codigo && this.Validar_valor_compra && this.Validar_valor_venta && this.Validar_stoock && this.Validar_fo_proveedor && this.Validar_fo_marca && funcion == 'editar') {
      this.editar();
    }
  }

  guardar(){
    this.sproductos.insertar(this.obj_productos).subscribe((datos:any) => {
      if(datos['resultado']== 'OK'){
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('no ver');
  }

  eliminar(id: number) {
    Swal.fire({
      title: "¿Está seguro que desea eliminar el producto?",
      text: "Este proceso no será reversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.sproductos.eliminar(id).subscribe((datos: any) => {
          if (datos['resultado'] == 'OK') {
            this.consulta();
          }
        });
        Swal.fire({
          title: "Producto eliminado!",
          text: "El producto ha sido eliminado.",
          icon: "success"
        });
      }
    });
  }

  cargar_datos(items : any, id: number){

    this.obj_productos = {
      nombre: items.nombre,
      codigo: items.codigo,
      valor_compra: items.valor_compra,
      valor_venta: items.valor_venta, 
      stoock: items.stoock,
      fo_proveedor: items.fo_proveedor,
      fo_marca: items.fo_marca,
    }
    this.id_productos = id;

    this.botones_form = true;
    this.mostrar_form('ver')
  }

  editar(){
    this.sproductos.editar(this.id_productos, this.obj_productos).subscribe((datos:any) => {
      if(datos['resultado'] == "OK"){
        this.consulta();
        Swal.fire('Editado!', 'El producto ha sido editado.', 'success');
      } else {
        Swal.fire('Error!', datos['mensaje'], 'error');
      }
    });
    this.limpiar();
    this.mostrar_form('no ver');
}

}