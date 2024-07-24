import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './Estructura/principal.component';

//Modulos
import { DashboardComponent } from './Modulos/dashboard/dashboard.component';
import { UsuariosComponent } from './Modulos/usuarios/usuarios.component';
import { AdministracionComponent } from './Modulos/administracion/administracion.component';
import { VentasComponent } from './Modulos/ventas/ventas.component';
import { InventarioComponent } from './Modulos/inventario/inventario.component';
import { ComprasComponent } from './Modulos/compras/compras.component';
import { SoporteComponent } from './Modulos/soporte/soporte.component';
import { AjustesComponent } from './Modulos/ajustes/ajustes.component';
import { LoginComponent } from './Modulos/login/login.component';
import { NoEncontroComponent } from './Modulos/no-encontro/no-encontro.component';
import { validaruserGuard } from './guard/validaruser.guard';

const routes: Routes = [
  {
    path: '', component: PrincipalComponent,
    children:
    [
      {path: 'dashboard', component: DashboardComponent, canActivate: [validaruserGuard]},
      {path: 'usuarios', component: UsuariosComponent, canActivate: [validaruserGuard]},
      {path: 'administracion', component: AdministracionComponent, canActivate: [validaruserGuard]},
      {path: 'ventas', component: VentasComponent, canActivate: [validaruserGuard]},
      {path: 'inventario', component: InventarioComponent, canActivate: [validaruserGuard]},
      {path: 'compras', component: ComprasComponent, canActivate: [validaruserGuard]},
      {path: 'soporte', component: SoporteComponent, canActivate: [validaruserGuard]},
      {path: 'ajustes', component:AjustesComponent, canActivate: [validaruserGuard]},
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
    ]
  },

  {path: 'login', component: LoginComponent},
  {path: '**', component: NoEncontroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }