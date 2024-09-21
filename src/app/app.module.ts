import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './estructura/header/header.component';
import { NavComponent } from './estructura/nav/nav.component';
import { FooterComponent } from './estructura/footer/footer.component';
import { PrincipalComponent } from './modulos/principal.component';
import { DashboardComponent } from './modulos/dashboard/dashboard.component';
import { LoginComponent } from './modulos/login/login.component';
import { UsuarioComponent } from './modulos/usuario/usuario.component';
import { ProductosComponent } from './modulos/productos/productos.component';
import { ClientesComponent } from './modulos/clientes/clientes.component';
import { VentasComponent } from './modulos/ventas/ventas.component';
import { ReparacionesComponent } from './modulos/reparaciones/reparaciones.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    FooterComponent,
    PrincipalComponent,
    DashboardComponent,
    LoginComponent,
    UsuarioComponent,
    ProductosComponent,
    ClientesComponent,
    VentasComponent,
    ReparacionesComponent
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

