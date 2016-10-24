<?php
    require_once('libs/dbconnect.php');
    require_once('libs/common_functions.php');

    $monthYear = mysqli_real_escape_string($conn, $_GET['month_year']);

    $sqlMonthlyTotal = " SELECT vwms.* FROM vw_workout_monthly_sales vwms  ";
    if(!empty($monthYear))
        $sqlMonthlyTotal .= " WHERE vwms.sales_group = '$monthYear'";
    else
        $sqlMonthlyTotal .= " WHERE vwms.sales_group = CONCAT(DATE_FORMAT(NOW(), '%M'), '-', DATE_FORMAT(NOW(), '%Y')) ";

    //echo $sqlMonthlyTotal;

    if ($rsTotal = mysqli_query($conn, $sqlMonthlyTotal) or die("Query fail: " . $sqlMonthlyTotal)) {
        $rowcount = mysqli_num_rows($rsTotal);

        if(0 < $rowcount)
            $data = mysqli_fetch_assoc($rsTotal);
        else {
            $data = array(
                "sales_group" => $monthYear,
                "monthly_sales" => "0",
                "transaction_count" => "0"
            );
        }

        header('Content-Type: application/json');
        echo json_encode($data);
    }

    exit(0);
?>