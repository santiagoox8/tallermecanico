<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Resquested-With, Content-Type, Accept");

  require("../conexion.php");


  $del = "DELETE FROM productos WHERE id_productos=".$_GET['id'];
  mysqli_query($conexion, $del) or die('No elimino');
  

  class Result {}

  $response = new Result();
  $response->resultado = 'OK';
  $response->mensaje = 'Producto borrado';
  
  header('Content-Type: application/json');
  echo json_encode($response);

?>