<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Resquested-With, Content-Type, Accept");

  require("../conexion.php");

  $con = "SELECT v.*, c.nombre AS ncliente, p.nombre AS nproducto FROM ventas v
         INNER JOIN clientes c ON v.fo_cliente = c.id_clientes
         INNER JOIN productos p ON v.fo_producto = p.id_productos
         ORDER BY c.nombre, p.nombre";


  $res=mysqli_query($conexion,$con) or die('no consulto venta');


  $vec=[];
  while ($reg=mysqli_fetch_array($res))
  {
    $vec[]=$reg;
  }

  $cad=json_encode($vec);
  echo $cad;
  header('Content-Type: application/json');

?>