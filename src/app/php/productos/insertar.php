<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Resquested-With, Content-Type, Accept");

  $json = file_get_contents('php://input');

  $params = json_decode($json);

  require("../conexion.php");


  $ins = "INSERT into productos(nombre, fo_marca, stock, cantidad, precios) values ('$params->nombre', '$params->fo_marca', '$params->stock', '$params->cantidad', '$params->precios')";

  mysqli_query($conexion, $ins) or die('No inserto');
  

  class Result {}

  $response = new Result();
  $response->resultado = 'OK';
  $response->mensaje = 'datos grabados';
  
  header('Content-Type: application/json');
  echo json_encode($response);

?>