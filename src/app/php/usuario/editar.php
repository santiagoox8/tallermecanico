<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Resquested-With, Content-Type, Accept");

  $json = file_get_contents('php://input');

  $params = json_decode($json);
  $id = $_GET['id'];

  require("../conexion.php");

  $editar = "UPDATE usuario SET nombre='$params->nombre', email='$params->email', clave=sha1('$params->clave'), tipo='$params->tipo' WHERE id_usuario=$id";
  mysqli_query($conexion, $editar) or die('No edito');
  

  class Result {}

  $response = new Result();
  $response->resultado = 'OK';
  $response->mensaje = 'Datos modificados';
  
  header('Content-Type: application/json');
  echo json_encode($response);

?>