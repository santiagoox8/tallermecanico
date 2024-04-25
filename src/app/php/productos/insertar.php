<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Resquested-With, Content-Type, Accept");

  $json = file_get_contents('php://input');

  $params = json_decode($json);

  require("../conexion.php");


  //$ins = "insert into usuario(nombre, email, clave, tipo) values('Prueba', 'Prueba@gmail.com', sha1('123456789'), '3022086203')";
  $ins = "insert into productos(nombre, stock, cantidad, precios) values('$params->nombre', '$params->stock', '$params->cantidad, '$params->precios')";

  mysqli_query($conexion, $ins) or die('No inserto');
  

  class Result {}

  $response = new Result();
  $response->resultado = 'OK';
  $response->mensaje = 'datos grabados';
  
  header('Content-Type: application/json');
  echo json_encode($response);

?>