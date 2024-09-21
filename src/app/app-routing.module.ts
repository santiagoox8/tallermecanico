import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { PrincipalComponent } from './modulos/principal.component';
import { DashboardComponent } from './modulos/dashboard/dashboard.component';
import { LoginComponent } from './modulos/login/login.component';
import { UsuarioComponent } from './modulos/usuario/usuario.component';
import { ValidaruserGuard } from './guards/validaruser.guard';
import { ProductosComponent } from './modulos/productos/productos.component';
import { ClientesComponent } from './modulos/clientes/clientes.component';
import { VentasComponent } from './modulos/ventas/ventas.component';
import { ReparacionesComponent } from './modulos/reparaciones/reparaciones.component';

const routes: Routes = [
  {
    path: '', component: PrincipalComponent,
    canActivate: [ValidaruserGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'usuario', component: UsuarioComponent },
      { path: 'inventario', component: ProductosComponent },
      { path: 'clientes', component: ClientesComponent },
      { path: 'ventas', component: VentasComponent },
      { path: 'reparaciones', component: ReparacionesComponent },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ]
  },
  { path: 'login', component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
