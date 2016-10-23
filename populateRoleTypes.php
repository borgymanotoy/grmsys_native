<?php
    require_once('libs/dbconnect.php');

    $sqlQuery = " SELECT * FROM role_type ";

    $result = mysqli_query($conn, $sqlQuery) or die("Query fail: " . $sqlQuery);
    $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
    header('Content-Type: application/json');
    echo json_encode($data);

    exit(0);
?>