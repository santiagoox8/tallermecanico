<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Resquested-With, Content-Type, Accept");

  require("../conexion.php");


  $del = "DELETE FROM usuario WHERE id_usuario=".$_GET['id'];
  mysqli_query($conexion, $del) or die('No elimino');
  

  class Result {}

  $response = new Result();
  $response->resultado = 'OK';
  $response->mensaje = 'Usuario borrado';
  
  header('Content-Type: application/json');
  echo json_encode($response);

?>