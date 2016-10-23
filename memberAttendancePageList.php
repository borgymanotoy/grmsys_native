<?php
    require_once('libs/dbconnect.php');
    require_once('libs/common_functions.php');

    //$log_date = mysqli_real_escape_string($conn, $_GET['log_date']);
    $searchName = mysqli_real_escape_string($conn, $_GET['searchKey']);
    //$dateLog = convertStringToDate($log_date);

    if( !empty($searchName)){
        $sqlQuery .= "SELECT * FROM vw_workout_sales  WHERE LOWER(member_name) LIKE '%".$searchName."%'";
    }

    $recordCount = mysqli_num_rows(mysqli_query($conn, $sqlQuery));

    if(0 < $recordCount){
        $result = mysqli_query($conn, $sqlQuery) or die("Query fail: " . $sqlQuery);
        include('pages/memberAttendancePageList.html');
    }
?>