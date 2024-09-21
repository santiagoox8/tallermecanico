import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  url='http://localhost/taller/src/app/php/ventas/';

  constructor(private http:HttpClient) { }

  consultar() {
    return this.http.get(`${this.url}consulta.php`);
  }

  consultar_cliente() {
    return this.http.get(`${this.url}consulta_cliente.php`);
  }

  consultar_producto() {
     return this.http.get(`${this.url}consulta_producto.php`);
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
