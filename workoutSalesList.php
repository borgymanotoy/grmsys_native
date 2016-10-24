<?php
    require_once('libs/dbconnect.php');
    require_once('libs/common_functions.php');

    $log_date = mysqli_real_escape_string($conn, $_GET['log_date']);
    $dateLog = convertStringToDate($log_date);

    
    $sqlQuery = " SELECT A.* FROM vw_workout_sales A ";
    if('null' != $dateLog)
        $sqlQuery .= " WHERE A.workout_date = $dateLog";
    else
        $sqlQuery .= " WHERE A.workout_date = date(now())";

    $recordCount = mysqli_num_rows(mysqli_query($conn, $sqlQuery));

    $sqlDailyTotal = " SELECT vwds.* FROM vw_workout_daily_sales vwds  ";
    if('null' != $dateLog)
        $sqlDailyTotal .= " WHERE vwds.workout_date = $dateLog";
    else
        $sqlDailyTotal .= " WHERE vwds.workout_date = DATE(NOW()) ";

    //echo $sqlQuery;

    if(0 < $recordCount){
        $result = mysqli_query($conn, $sqlQuery) or die("Query fail: " . $sqlQuery);
        include('pages/workoutSalesList.html');    
    } 

    if($rsTotal = mysqli_query($conn, $sqlDailyTotal) or die("Query fail: " . $sqlDailyTotal)){
        $data = mysqli_fetch_assoc($result);
    }

    exit(0);
?>