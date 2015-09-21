<?php
	require_once('libs/dbconnect.php');
	require_once('libs/common_functions.php');

	$start_date = mysqli_real_escape_string($conn, $_GET['start_date']);
	$dateStart = convertStringToDate($start_date);
	
	$end_date = mysqli_real_escape_string($conn, $_GET['end_date']);
	$dateEnd = convertStringToDate($end_date);


	$sqlTotal = " SELECT SUM(total_sales) AS total_sales FROM vw_workout_sales_total ";
	if('null' != $dateStart && 'null' != $dateEnd)
		$sqlTotal .= " WHERE workout_date between $dateStart and $dateEnd";
	else
		$sqlTotal .= " WHERE workout_date BETWEEN CAST(DATE_FORMAT(NOW() ,'%Y-%m-01') AS DATE) and LAST_DAY(NOW()) ";

	//echo $sqlTotal;

	if ($rsTotal = mysqli_query($conn, $sqlTotal) or die("Query fail: " . $sqlTotal)) {
		$data = mysqli_fetch_all($rsTotal, MYSQLI_ASSOC);
		header('Content-Type: application/json');
		echo json_encode($data);
	}	

	exit(0);
?>