import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent {

  nombre: any;
  tipo_usuario: any

  constructor(private router: Router){}

  ngOnInit(): void{
    this.nombre = sessionStorage.getItem("nombre");
    this.tipo_usuario = sessionStorage.getItem("tipo_usuario");
    console.log(this.tipo_usuario);
  }

  cerrar(){
    sessionStorage.setItem("id", "");
    sessionStorage.setItem("nombre", "");
    sessionStorage.setItem("email", "");
    sessionStorage.setItem("tipo_usuario", "");
    this.router.navigate(['login'])
  }

}
