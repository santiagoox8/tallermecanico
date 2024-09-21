<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Resquested-With, Content-Type, Accept");

  require("../conexion.php");

  $con = "SELECT c.*, o.nombre AS nciudad FROM clientes c
          INNER JOIN ciudad o ON c.fo_ciudad = o.id_ciudad
          ORDER BY c.nombre";
          
  $res=mysqli_query($conexion,$con) or die('no consulto cliente');


  $vec=[];
  while ($reg=mysqli_fetch_array($res))
  {
    $vec[]=$reg;
  }

  $cad=json_encode($vec);
  echo $cad;
  header('Content-Type: application/json');

?>