import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavComponent } from './Estructura/nav/nav.component';
import { AsideComponent } from './Estructura/aside/aside.component';
import { ContentComponent } from './Estructura/content/content.component';
import { FooterComponent } from './Estructura/footer/footer.component';
import { PrincipalComponent } from './Estructura/principal.component';
import { DashboardComponent } from './Modulos/dashboard/dashboard.component';
import { AdministracionComponent } from './Modulos/administracion/administracion.component';
import { UsuariosComponent } from './Modulos/usuarios/usuarios.component';
import { AjustesComponent } from './Modulos/ajustes/ajustes.component';
import { ComprasComponent } from './Modulos/compras/compras.component';
import { VentasComponent } from './Modulos/ventas/ventas.component';
import { InventarioComponent } from './Modulos/inventario/inventario.component';
import { SoporteComponent } from './Modulos/soporte/soporte.component';
import { LoginComponent } from './Modulos/login/login.component';
import { NoEncontroComponent } from './Modulos/no-encontro/no-encontro.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AsideComponent,
    ContentComponent,
    FooterComponent,
    PrincipalComponent,
    DashboardComponent,
    AdministracionComponent,
    UsuariosComponent,
    AjustesComponent,
    ComprasComponent,
    VentasComponent,
    InventarioComponent,
    SoporteComponent,
    LoginComponent,
    NoEncontroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
