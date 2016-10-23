<?php
    require_once('libs/dbconnect.php');

    $searchkey = mysqli_real_escape_string($conn, $_GET['searchKey']);
    $sqlQuery = "SELECT vu.question1, vu.question2, vu.question3 FROM vw_users vu";

    $recordCount = mysqli_num_rows(mysqli_query($conn, $sqlQuery));

    if(0 < $recordCount){
        $result = mysqli_query($conn, $sqlQuery) or die("Query fail: " . $sqlQuery);
        include('pages/processForgotPW.html');
    }

    exit(0);
?>