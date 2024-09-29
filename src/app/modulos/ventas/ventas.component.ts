import { Component, OnInit } from '@angular/core';
import { VentasService } from 'src/app/servicios/ventas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {

  //variables globales
  verf= false;
  venta: any;
  cliente: any;
  producto: any;
  idventa: any;
  vent = {
    fo_cliente: 0,
    fo_producto: 0,
    cantidad:"",
    precios:"",
    subtotales:"",
    iva:"",
    total:""
  };
  //para validar
  validfocliente = true;
  validfoproducto = true;
  validcantidad = true;
  validprecios = true;
  validsubtotales = true;
  validiva = true;
  validtotal = true;
  beditar = false;

  constructor(private sventa: VentasService) { }

  ngOnInit(): void {
    this.consulta();
    this.consulta_cliente();
    this.consulta_producto();
  }

  //mostrar formulario
  mostrar(dato:any) {
    switch(dato){
      case 0:
        this.verf = false;
        this.beditar = false;
        this.idventa = "";
        this.limpiar();
      break;
      case 1:
        this.verf = true;
      break;
    }
  }
  //limpiar
  limpiar(){
    this.vent.fo_cliente = 0;
    this.vent.fo_producto = 0;
    this.vent.cantidad = "";
    this.vent.precios = "";
    this.vent.subtotales = "";
    this.vent.iva = "";
    this.vent.total = "";
  }
  //validar
  validar(){
    if(this.vent.fo_cliente == 0){
      this.validfocliente = false;
    }else{
      this.validfocliente = true;
    }

    if(this.vent.fo_producto == 0){
      this.validfoproducto = false;
    }else{
      this.validfoproducto = true;
    }

    if(this.vent.cantidad == ""){
      this.validcantidad = false;
    }else{
      this.validcantidad = true;
    }

    if(this.vent.precios == ""){
      this.validprecios = false;
    }else{
      this.validprecios = true;
    }

    if(this.vent.subtotales == ""){
      this.validsubtotales = false;
    }else{
      this.validsubtotales = true;
    }

    if(this.vent.iva == ""){
      this.validiva = false;
    }else{
      this.validiva = true;
    }

    if(this.vent.total == ""){
      this.validtotal = false;
    }else{
      this.validtotal = true;
    }
  }


  consulta() {
    this.sventa.consultar().subscribe((result:any) => {
      this.venta = result;
      console.log(this.venta);
    })
  }

  consulta_cliente() {
    this.sventa.consultar_cliente().subscribe((result:any) => {
      this.cliente = result;
      console.log(this.venta);
    })
  }

  consulta_producto() {
    this.sventa.consultar_producto().subscribe((result:any) => {
      this.producto = result;
      console.log(this.venta);
    })
  }

  ingresar() {
    //console.log(this.cat);
    this.validar();

    let te = Number(this.vent.fo_cliente);
    this.vent.fo_cliente = te;
    console.log(this.vent);

    let pr = Number(this.vent.fo_producto);
    this.vent.fo_producto = pr;
    console.log(this.vent);

    if(this.validfocliente==true && this.validfoproducto==true && this.validcantidad==true && this.validprecios==true && this.validsubtotales==true && this.validiva==true && this.validtotal==true){
      this.sventa.insertar(this.vent).subscribe((datos:any) => {
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
      title: 'Esta seguro de eliminar la venta?',
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
          text: "La venta ha sido eliminado",
          icon: "success"
        });
      }
    });
  }

  borrarusuario (id:any){
    console.log(id);
    this.sventa.eliminar(id).subscribe((datos:any) => {
      if(datos['resultado']=='OK'){
        this.consulta();
      }
    });
  }

  cargardatos(datos:any, id:number){
    //console.log(datos);
    this.vent.fo_cliente = datos.fo_cliente;
    this.vent.fo_producto = datos.fo_producto;
    this.vent.cantidad = datos.cantidad;
    this.vent.precios = datos.precios;
    this.vent.subtotales = datos.subtotales;
    this.vent.iva = datos.iva;
    this.vent.total = datos.total;
    this.idventa = id;
    this.mostrar(1);
    this.beditar=true;
  }

  editar(){
    //console.log(this.cat);
    this.validar();

    if(this.validfocliente==true && this.validfoproducto==true && this.validcantidad==true && this.validprecios==true && this.validsubtotales==true && this.validiva==true && this.validtotal==true){
      this.sventa.edit(this.vent, this.idventa).subscribe((datos:any) => {
        if (datos['resultado']=='OK') {
          //alert(datos['mensaje']);
          this.consulta();
        }
      });
      this.mostrar(0);
    }
  }
}


