<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Resquested-With, Content-Type, Accept");

  $json = file_get_contents('php://input');

  $params = json_decode($json);

  require("../conexion.php");


  //$ins = "insert into usuario(nombre, email, clave, tipo) values('Prueba', 'Prueba@gmail.com', sha1('123456789'), '3022086203')";
  $ins = "INSERT INTO ventas(fo_cliente, fo_producto, cantidad, precios, subtotales, iva, total) values('$params->fo_cliente', '$params->fo_producto', '$params->cantidad', '$params->precios', '$params->subtotales', '$params->iva', '$params->total')";

  mysqli_query($conexion, $ins) or die('No inserto');
  

  class Result {}

  $response = new Result();
  $response->resultado = 'OK';
  $response->mensaje = 'datos grabados';
  
  header('Content-Type: application/json');
  echo json_encode($response);

?>