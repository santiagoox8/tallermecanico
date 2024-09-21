import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReparacionesService {

  url='http://localhost/taller/src/app/php/reparaciones/';

  constructor(private http:HttpClient) { }

  consultar() {
    return this.http.get(`${this.url}consulta.php`);
  }

  consultar_cliente() {
    return this.http.get(`${this.url}consulta_cliente.php`);
  }

  consultar_reparacion() {
     return this.http.get(`${this.url}consulta_reparacion.php`);
  }

  consultar_usuario() {
    return this.http.get(`${this.url}consulta_usuario.php`);
 }

  insertar(datos:any) {
    return this.http.post(`${this.url}insertar.php`, JSON.stringify(datos));
  }

  eliminar(id:number) {
    return this.http.get(`${this.url}eliminar.php?id=${id}`);
  }

  edit(datos:any, id:number) {
    return this.http.post(`${this.url}editar.php?id=${id}`, JSON.stringify(datos));
}
}
