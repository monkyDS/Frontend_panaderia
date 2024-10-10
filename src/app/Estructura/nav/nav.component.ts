import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  nombre: any;
  tipo_usuario: any;
  email: any;

  constructor(private router:Router){}

  ngOnInit(): void{
    this.nombre = sessionStorage.getItem("nombre");
    this.tipo_usuario = sessionStorage.getItem("tipo_usuario");
    this.email = sessionStorage.getItem("email");
  }

  cerrar(){
    sessionStorage.setItem("id", "");
    sessionStorage.setItem("nombre", "");
    sessionStorage.setItem("email", "");
    sessionStorage.setItem("tipo_usuario", "");
    this.router.navigate(['login'])
  }

}