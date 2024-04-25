<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Resquested-With, Content-Type, Accept");

  require("../conexion.php");

  $con = "SELECT * from reparaciones ORDER BY nombre";
  $res=mysqli_query($conexion,$con) or die('no consulto reparacion');


  $vec=[];
  while ($reg=mysqli_fetch_array($res))
  {
    $vec[]=$reg;
  }

  $cad=json_encode($vec);
  echo $cad;
  header('Content-Type: application/json');

?>