<?php
    $servidor = "localhost";
    $usuario = "root";
    $clave = "";
    $bd = "taller";

    $conexion = mysqli_connect($servidor, $usuario, $clave) or die ("No encontro el servidor");
    mysqli_select_db($conexion, $bd) or die ("No encontro la base de datos");
    mysqli_set_charset($conexion,"utf8");

?>