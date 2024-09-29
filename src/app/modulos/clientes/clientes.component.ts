import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/servicios/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  //variables globales
  verf= false;
  cliente: any;
  ciudad: any;
  idclien: any;
  client = {
    nombre: "",
    direccion:"",
    celular:"",
    email:"",
    fo_ciudad:0
  };
  //para validar
  validnombre = true;
  validdireccion = true;
  validcelular = true;
  validemail = true;
  validfociudad = true;
  beditar = false;

  constructor(private scliente: ClientesService) { }

  ngOnInit(): void {
    this.consulta();
    this.consulta_ciudad();
  }
  //mostrar formulario
  mostrar(dato:any) {
    switch(dato){
      case 0:
        this.verf = false;
        this.beditar = false;
        this.idclien = "";
        this.limpiar();
      break;
      case 1:
        this.verf = true;
      break;
    }
  }

  //limpiar
  limpiar(){
    this.client.nombre = "";
    this.client.direccion = "";
    this.client.celular = "";
    this.client.email = "";
    this.client.fo_ciudad = 0;
  }
  //validar
  validar(){
    if(this.client.nombre == ""){
      this.validnombre = false;
    }else{
      this.validnombre = true;
    }

    if(this.client.direccion == ""){
      this.validdireccion = false;
    }else{
      this.validdireccion = true;
    }

    if(this.client.celular == ""){
      this.validcelular = false;
    }else{
      this.validcelular = true;
    }

    if(this.client.email == ""){
      this.validemail = false;
    }else{
      this.validemail = true;
    }

    if(this.client.fo_ciudad == 0){
      this.validfociudad = false;
    }else{
      this.validfociudad = true;
    }
  }

  consulta() {
    this.scliente.consultar().subscribe((result:any) => {
      this.cliente = result;
      console.log(this.cliente);
    })
  }

  consulta_ciudad() {
    this.scliente.consultar_ciudad().subscribe((result:any) => {
      this.ciudad = result;
      console.log(this.cliente);
    })
  }

  ingresar() {
    //console.log(this.cat);
    this.validar();

    let ci = Number(this.client.fo_ciudad);
    this.client.fo_ciudad = ci;
    console.log(this.client);

    if(this.validnombre==true && this.validdireccion==true && this.validcelular==true && this.validemail==true && this.validfociudad==true){
      this.scliente.insertar(this.client).subscribe((datos:any) => {
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
      title: 'Esta seguro de eliminar el cliente '+ nombre +'?',
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
          text: "El cliente ha sido eliminado",
          icon: "success"
        });
      }
    });
  }

  borrarusuario (id:any){
    console.log(id);
    this.scliente.eliminar(id).subscribe((datos:any) => {
      if(datos['resultado']=='OK'){
        this.consulta();
      }
    });
  }

  cargardatos(datos:any, id:number){
    //console.log(datos);
    this.client.nombre = datos.nombre;
    this.client.direccion = datos.direccion;
    this.client.celular = datos.celular;
    this.client.email = datos.email;
    this.client.fo_ciudad = datos.fo_ciudad;
    this.idclien = id;
    this.mostrar(1);
    this.beditar=true;
  }

  editar(){
    //console.log(this.cat);
    this.validar();

    if(this.validnombre==true && this.validdireccion==true && this.validcelular==true && this.validemail==true && this.validfociudad==true){
      this.scliente.edit(this.client, this.idclien).subscribe((datos:any) => {
        if (datos['resultado']=='OK') {
          //alert(datos['mensaje']);
          this.consulta();
        }
      });
      this.mostrar(0);
    }
  }

}
