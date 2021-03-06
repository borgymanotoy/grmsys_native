<?php
	require_once('libs/dbconnect.php');
	require_once('libs/common_functions.php');

	$start_date = mysqli_real_escape_string($conn, $_GET['start_date']);
	$dateStart = convertStringToDate($start_date);
	
	$end_date = mysqli_real_escape_string($conn, $_GET['end_date']);
	$dateEnd = convertStringToDate($end_date);

	$sqlTotal = " SELECT SUM(total_sales) AS total_sales FROM vw_sold_items_daily_total ";
	if('null' != $dateStart && 'null' != $dateEnd)
		$sqlTotal .= " WHERE sales_date between $dateStart and $dateEnd";
	else
		$sqlTotal .= " WHERE sales_date BETWEEN date(SUBDATE(NOW(), WEEKDAY(NOW()))) and DATE(NOW() + INTERVAL (6 - WEEKDAY(NOW())) DAY) ";

	//echo $sqlTotal;

	if ($rsTotal = mysqli_query($conn, $sqlTotal) or die("Query fail: " . $sqlTotal)) {
		$data = mysqli_fetch_all($rsTotal, MYSQLI_ASSOC);
		header('Content-Type: application/json');
		echo json_encode($data);
	}	

	exit(0);
?>