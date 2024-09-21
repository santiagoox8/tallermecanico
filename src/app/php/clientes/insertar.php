<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Resquested-With, Content-Type, Accept");

  $json = file_get_contents('php://input');

  $params = json_decode($json);

  require("../conexion.php");


  $ins = "INSERT into clientes(nombre, direccion, celular, email, fo_ciudad) values ('$params->nombre', '$params->direccion', '$params->celular', '$params->email', '$params->fo_ciudad')";

  mysqli_query($conexion, $ins) or die('No inserto');
  

  class Result {}

  $response = new Result();
  $response->resultado = 'OK';
  $response->mensaje = 'datos grabados';
  
  header('Content-Type: application/json');
  echo json_encode($response);

?>