import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { ProductosService } from 'src/app/servicios/productos.service';
import { VentasService } from 'src/app/servicios/ventas.service';

@Component({
  selector: 'app-ventas-insertar',
  templateUrl: './ventas-insertar.component.html',
  styleUrls: ['./ventas-insertar.component.scss']
})
export class VentasInsertarComponent {

  productos: any;
  cliente: any;
  identificacion_cliente = "";
  nombre_cliente = "";
  matriz_producto: any = [];
  arreglo_productos: any = [];
  total: any = 0;
  iva: number = 0.19;
  ventas = {
    fecha: "",
    fo_cliente: 0,
    productos: [],
    subtotal: 0,
    iva: 0,
    total: 0,
    fo_usuario: 0
  } 


  
  constructor(private router: Router, private sproductos: ProductosService, private scliente: ClienteService, private spedido: VentasService) { }

  ngOnInit(): void {
    this.consulta_productos();
  }

  consulta_productos() {
    this.sproductos.consultar().subscribe((resultado: any) => {
      this.productos = resultado;
    });
  }

  consulta_cliente() {
    this.scliente.ccliente(this.identificacion_cliente).subscribe((result: any) => {
      this.cliente = result;
      this.nombre_cliente = this.cliente[0].nombre;
      console.log(this.cliente);
    });
  }

  seleccionar(valores: any, id: number) {
    let cantidad = Number(prompt("Ingrese la cantidad a llevar"));

    if (isNaN(cantidad) || cantidad <= 0) {
      alert("Por favor ingrese una cantidad válida.");
      return;
    }

    this.arreglo_productos = [valores.codigo, valores.nombre, Number(valores.valor_venta), cantidad, cantidad * Number(valores.valor_venta)];
    this.matriz_producto.push(this.arreglo_productos);

    let largo = this.matriz_producto.length;
    this.total = 0;
    for(let i=0; i<largo; i++){
      this.total = this.total + this.matriz_producto[i][4];
    }
    //console.log(this.matriz_productos);

  }

  guardar() {
    if (!this.cliente || this.arreglo_productos.length === 0) {
      alert("Debe seleccionar un cliente y al menos un producto para guardar la venta.");
      return;
    }

    let fecha = new Date();
    this.ventas.fecha = `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}`;
    this.ventas.fo_cliente = Number(this.cliente[0].id_cliente);
    this.ventas.productos = this.matriz_producto;
    this.ventas.subtotal = this.total;
    this.ventas.iva = this.total * this.iva;
    this.ventas.total = this.total + this.ventas.iva;
    this.ventas.fo_usuario = Number(sessionStorage.getItem('id'));
    console.log(this.ventas);

    this.spedido.insertar(this.ventas).subscribe((datos: any) => {
       if(datos['resultado'] == 'OK') {
        //console.log(datos['resultado']);
        this.router.navigate(['ventas']);
      }
    });
  }

  quitar(indice: number) {
    this.matriz_producto.splice(indice, 1);
  
    this.total = 0;
    for (let i = 0; i < this.matriz_producto.length; i++) {
      this.total += this.matriz_producto[i][4];
    }
  }
}