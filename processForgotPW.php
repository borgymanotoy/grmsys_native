<?php
    require_once('libs/dbconnect.php');
    require_once('libs/common_functions.php');

    require_once('libs/dbconnect.php');
    require_once('libs/common_functions.php');

    $username = $_POST['username'];

    $sqlPWList = "SELECT * FROM vw_users WHERE username = '" . $username . "'";

    $rsPWList = mysqli_query($conn, $sqlPWList);
    $row = mysqli_fetch_assoc($rsPWList);

    include('pages/processForgotPW.html');
?>