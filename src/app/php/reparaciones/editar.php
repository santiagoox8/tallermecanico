<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Resquested-With, Content-Type, Accept");

  $json = file_get_contents('php://input');

  $params = json_decode($json);
  $id = $_GET['id'];

  require("../conexion.php");

  $editar = "UPDATE reparaciones SET fo_cliente='$params->fo_cliente', fo_repuestos='$params->fo_repuestos', cantidad='$params->cantidad', precios='$params->precios', subtotales='$params->subtotales', iva='$params->iva', total='$params->total', fo_usuario='$params->fo_usuario' WHERE id_reparaciones=$id";
  mysqli_query($conexion, $editar) or die('No edito');
  

  class Result {}

  $response = new Result();
  $response->resultado = 'OK';
  $response->mensaje = 'Datos modificados';
  
  header('Content-Type: application/json');
  echo json_encode($response);

?>