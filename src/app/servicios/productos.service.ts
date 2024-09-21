import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url='http://localhost/taller/src/app/php/productos/';

  constructor(private http:HttpClient) { }

  consultar() {
    return this.http.get(`${this.url}consulta.php`);
  }

  insertar(datos:any) {
    return this.http.post(`${this.url}insertar.php`, JSON.stringify(datos));
  }

  consultar_marca() {
    return this.http.get(`${this.url}consulta_marca.php`);
  }
 
  eliminar(id:number) {
    return this.http.get(`${this.url}eliminar.php?id=${id}`);
  }

  edit(datos:any, id:number) {
    return this.http.post(`${this.url}editar.php?id=${id}`, JSON.stringify(datos));
}
}
