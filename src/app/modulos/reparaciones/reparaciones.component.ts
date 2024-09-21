import { Component, OnInit } from '@angular/core';
import { ReparacionesService } from 'src/app/servicios/reparaciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reparaciones',
  templateUrl: './reparaciones.component.html',
  styleUrls: ['./reparaciones.component.scss']
})
export class ReparacionesComponent implements OnInit {

  //variables globales
  verf= false;
  reparacion: any;
  cliente: any;
  repuestos: any;
  usuario: any;
  idreparacion: any;
  repar = {
    fo_cliente: 0,
    fo_repuestos: 0,
    cantidad:"",
    precios:"",
    subtotales:"",
    iva:"",
    total:"",
    fo_usuario: 0
  };
  //para validar
  validfocliente = true;
  validforepuestos = true;
  validcantidad = true;
  validprecios = true;
  validsubtotales = true;
  validiva = true;
  validtotal = true;
  validfousuario = true;
  beditar = false;

  constructor(private sreparacion: ReparacionesService) { }

  ngOnInit(): void {
    this.consulta();
    this.consulta_cliente();
    this.consulta_reparacion();
    this.consulta_usuario();
  }

  //mostrar formulario
  mostrar(dato:any) {
    switch(dato){
      case 0:
        this.verf = false;
        this.beditar = false;
        this.idreparacion = "";
        this.limpiar();
      break;
      case 1:
        this.verf = true;
      break;
    }
  }
  //limpiar
  limpiar(){
    this.repar.fo_cliente = 0;
    this.repar.fo_repuestos = 0;
    this.repar.cantidad = "";
    this.repar.precios = "";
    this.repar.subtotales = "";
    this.repar.iva = "";
    this.repar.total = "";
    this.repar.fo_usuario = 0;
  }
  //validar
  validar(){
    if(this.repar.fo_cliente == 0){
      this.validfocliente = false;
    }else{
      this.validfocliente = true;
    }

    if(this.repar.fo_repuestos == 0){
      this.validforepuestos = false;
    }else{
      this.validforepuestos = true;
    }

    if(this.repar.cantidad == ""){
      this.validcantidad = false;
    }else{
      this.validcantidad = true;
    }

    if(this.repar.precios == ""){
      this.validprecios = false;
    }else{
      this.validprecios = true;
    }

    if(this.repar.subtotales == ""){
      this.validsubtotales = false;
    }else{
      this.validsubtotales = true;
    }

    if(this.repar.iva == ""){
      this.validiva = false;
    }else{
      this.validiva = true;
    }

    if(this.repar.total == ""){
      this.validtotal = false;
    }else{
      this.validtotal = true;
    }

    if(this.repar.fo_usuario == 0){
      this.validfousuario = false;
    }else{
      this.validfousuario = true;
    }
  }


  consulta() {
    this.sreparacion.consultar().subscribe((result:any) => {
      this.reparacion = result;
      console.log(this.reparacion);
    })
  }

  consulta_cliente() {
    this.sreparacion.consultar_cliente().subscribe((result:any) => {
      this.cliente = result;
      console.log(this.reparacion);
    })
  }

  consulta_reparacion() {
    this.sreparacion.consultar_reparacion().subscribe((result:any) => {
      this.repuestos = result;
      console.log(this.reparacion);
    })
  }

  consulta_usuario() {
    this.sreparacion.consultar_usuario().subscribe((result:any) => {
      this.usuario = result;
      console.log(this.reparacion);
    })
  }

  ingresar() {
    //console.log(this.cat);
    this.validar();

    if(this.validfocliente=true && this.validforepuestos==true && this.validcantidad==true && this.validprecios==true && this.validsubtotales==true && this.validiva==true && this.validtotal==true && this.validfousuario==true){
      this.sreparacion.insertar(this.repar).subscribe((datos:any) => {
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
      title: 'Esta seguro de eliminar la raparacion?',
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
          text: "La reparacion ha sido eliminada",
          icon: "success"
        });
      }
    });
  }

  borrarusuario (id:any){
    console.log(id);
    this.sreparacion.eliminar(id).subscribe((datos:any) => {
      if(datos['resultado']=='OK'){
        this.consulta();
      }
    });
  }

  cargardatos(datos:any, id:number){
    //console.log(datos);
    this.repar.fo_cliente = datos.fo_cliente;
    this.repar.fo_repuestos = datos.fo_repuestos;
    this.repar.cantidad = datos.cantidad;
    this.repar.precios = datos.precios;
    this.repar.subtotales = datos.subtotales;
    this.repar.iva = datos.iva;
    this.repar.total = datos.total;
    this.repar.fo_usuario = datos.fo_usuario;
    this.idreparacion = id;
    this.mostrar(1);
    this.beditar=true;
  }

  editar(){
    //console.log(this.cat);
    this.validar();

    if(this.validfocliente=true && this.validforepuestos==true && this.validcantidad==true && this.validprecios==true && this.validsubtotales==true && this.validiva==true && this.validtotal==true && this.validfousuario==true){
      this.sreparacion.edit(this.repar, this.idreparacion).subscribe((datos:any) => {
        if (datos['resultado']=='OK') {
          //alert(datos['mensaje']);
          this.consulta();
        }
      });
      this.mostrar(0);
    }
  }

}
