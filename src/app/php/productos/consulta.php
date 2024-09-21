<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Resquested-With, Content-Type, Accept");

  require("../conexion.php");

  $con = "SELECT p.*, m.nombre AS nmarca FROM productos p 
          INNER JOIN marca m ON p.fo_marca = m.id_marca
          ORDER BY p.nombre";


  $res=mysqli_query($conexion,$con) or die('no consulto producto');


  $vec=[];
  while ($reg=mysqli_fetch_array($res))
  {
    $vec[]=$reg;
  }

  $cad=json_encode($vec);
  echo $cad;
  header('Content-Type: application/json');

?>