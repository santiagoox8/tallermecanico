import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/servicios/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  //variables globales
  verf= false;
  producto: any;
  marca: any;
  idprod: any;
  product = {
    nombre: "",
    fo_marca:0,
    stock:"",
    cantidad:"",
    precios: ""
  };
  //para validar
  validnombre = true;
  validfomarca = true;
  validcantidad = true;
  validprecios = true;
  validstock = true;
  beditar = false;

  constructor(private sproducto: ProductoService) { }

  ngOnInit(): void {
    this.consulta();
    this.consulta_marca();
  }
  //mostrar formulario
  mostrar(dato:any) {
    switch(dato){
      case 0:
        this.verf = false;
        this.beditar = false;
        this.idprod = "";
        this.limpiar();
      break;
      case 1:
        this.verf = true;
      break;
    }
  }

  //limpiar
  limpiar(){
    this.product.nombre = "";
    this.product.fo_marca = 0;
    this.product.cantidad = "";
    this.product.precios = "";
    this.product.stock = "";
  }
  //validar
  validar(){
    if(this.product.nombre == ""){
      this.validnombre = false;
    }else{
      this.validnombre = true;
    }

    if(this.product.fo_marca == 0){
      this.validfomarca = false;
    }else{
      this.validfomarca = true;
    }

    if(this.product.cantidad == ""){
      this.validcantidad = false;
    }else{
      this.validcantidad = true;
    }

    if(this.product.precios == ""){
      this.validprecios = false;
    }else{
      this.validprecios = true;
    }

    if(this.product.stock == ""){
      this.validstock = false;
    }else{
      this.validstock = true;
    }
  }
  
  consulta() {
    this.sproducto.consultar().subscribe((result:any) => {
      this.producto = result;
      console.log(this.producto);
    })
  }

  consulta_marca() {
    this.sproducto.consultar_marca().subscribe((result:any) => {
      this.marca = result;
      console.log(this.producto);
    })
  }

  ingresar() {
    //console.log(this.cat);
    this.validar();

    let ma = Number(this.product.fo_marca);
    this.product.fo_marca = ma;
    console.log(this.product);

    if(this.validnombre==true && this.validfomarca==true && this.validcantidad==true && this.validprecios==true && this.validstock==true){
      this.sproducto.insertar(this.product).subscribe((datos:any) => {
        if (datos['resultado']=='OK') {
          //alert(datos['mensaje']);
          this.consulta();
        }
      });
      this.mostrar(0);
      this.limpiar();
    }
  }

  pregunta (id: any, nombre: any) {
    console.log("entro con el id " + id);
    Swal.fire({
      title: 'Esta seguro de eliminar el producto '+ nombre +'?',
      text: "Esta accion no sera revertida!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.borrarusuario(id);
        Swal.fire({
          title: "Eliminado!",
          text: "El producto ha sido eliminado",
          icon: "success"
        });
      }
    });
  }

  borrarusuario (id:any){
    console.log(id);
    this.sproducto.eliminar(id).subscribe((datos:any) => {
      if(datos['resultado']=='OK'){
        this.consulta();
      }
    });
  }

  cargardatos(datos:any, id:number){
    //console.log(datos);
    this.product.nombre = datos.nombre;
    this.product.fo_marca = datos.fo_marca;
    this.product.stock = datos.stock;
    this.product.cantidad = datos.cantidad;
    this.product.precios = datos.precios;
    this.idprod = id;
    this.mostrar(1);
    this.beditar=true;
  }

  editar(){
    //console.log(this.cat);
    this.validar();

    if(this.validnombre==true && this.validfomarca==true && this.validcantidad==true && this.validprecios==true && this.validstock==true){
      this.sproducto.edit(this.product, this.idprod).subscribe((datos:any) => {
        if (datos['resultado']=='OK') {
          //alert(datos['mensaje']);
          this.consulta();
        }
      });
      this.mostrar(0);
    }
  }
}
