<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Resquested-With, Content-Type, Accept");

  require("../conexion.php");

  $con = "SELECT r.*, c.nombre AS ncliente, p.nombre AS nrepuesto, u.nombre AS nusuario FROM reparaciones r
          INNER JOIN clientes c ON r.fo_cliente = c.id_clientes
          INNER JOIN repuestos p ON r.fo_repuestos = p.id_repuesto
          INNER JOIN usuario u ON r.fo_usuario = u.id_usuario
          ORDER BY c.nombre, p.nombre, u.nombre";
          
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