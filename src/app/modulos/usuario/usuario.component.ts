import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  //variables globales
  verf= false;
  usuario: any;
  iduser: any;
  user = {
    nombre: "",
    email:"",
    clave:"",
    tipo:""
  };
  //para validar
  validnombre = true;
  validemail = true;
  validclave = true;
  validtipo = true;
  beditar = false;

  constructor(private suser: UsuarioService) { }

  ngOnInit(): void {
    this.consulta();
    this.limpiar();
  }
  //mostrar formulario
  mostrar(dato:any) {
    switch(dato){
      case 0:
        this.verf = false;
        this.beditar = false;
        this.iduser = "";
        this.limpiar();
      break;
      case 1:
        this.verf = true;
      break;
    }
  }
  //limpiar
  limpiar(){
    this.user.nombre = "";
    this.user.email = "";
    this.user.clave = "";
    this.user.tipo = "";
  }
  //validar
  validar(){
    if(this.user.nombre == ""){
      this.validnombre = false;
    }else{
      this.validnombre = true;
    }

    if(this.user.email == ""){
      this.validemail = false;
    }else{
      this.validemail = true;
    }

    if(this.user.clave == ""){
      this.validclave = false;
    }else{
      this.validclave = true;
    }

    if(this.user.tipo == ""){
      this.validtipo = false;
    }else{
      this.validtipo = true;
    }
  }


  consulta() {
    this.suser.consultar().subscribe((result:any) => {
      this.usuario = result;
      console.log(this.usuario);
    })
  }

  ingresar() {
    //console.log(this.cat);
    this.validar();

    if(this.validnombre=true && this.validemail==true && this.validclave==true && this.validtipo==true){
      this.suser.insertar(this.user).subscribe((datos:any) => {
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
      title: 'Esta seguro de eliminar el usuario '+ nombre +'?',
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
          text: "El usuario ha sido eliminado",
          icon: "success"
        });
      }
    });
  }

  borrarusuario (id:any){
    console.log(id);
    this.suser.eliminar(id).subscribe((datos:any) => {
      if(datos['resultado']=='OK'){
        this.consulta();
      }
    });
  }

  cargardatos(datos:any, id:number){
    //console.log(datos);
    this.user.nombre = datos.nombre;
    this.user.email = datos.email;
    this.user.clave = datos.clave;
    this.user.tipo = datos.tipo;
    this.iduser = id;
    this.mostrar(1);
    this.beditar=true;
  }

  editar(){
    //console.log(this.cat);
    this.validar();

    if(this.validnombre=true && this.validemail==true && this.validclave==true && this.validtipo==true){
      this.suser.edit(this.user, this.iduser).subscribe((datos:any) => {
        if (datos['resultado']=='OK') {
          //alert(datos['mensaje']);
          this.consulta();
        }
      });
      this.mostrar(0);
    }
  }
}
