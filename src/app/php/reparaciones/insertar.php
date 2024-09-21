<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Resquested-With, Content-Type, Accept");

  $json = file_get_contents('php://input');

  $params = json_decode($json);

  require("../conexion.php");


  //$ins = "insert into usuario(nombre, email, clave, tipo) values('Prueba', 'Prueba@gmail.com', sha1('123456789'), '3022086203')";
  $ins = "INSERT INTO reparaciones(fo_cliente, fo_repuestos, cantidad, precios, subtotales, iva, total, fo_usuario) values ('$params->fo_cliente', '$params->fo_repuestos', '$params->cantidad', '$params->precios', '$params->subtotales', '$params->iva', '$params->total', '$params->fo_usuario')";

  mysqli_query($conexion, $ins) or die('No inserto');
  

  class Result {}

  $response = new Result();
  $response->resultado = 'OK';
  $response->mensaje = 'datos grabados';
  
  header('Content-Type: application/json');
  echo json_encode($response);

?>