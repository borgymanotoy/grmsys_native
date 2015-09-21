<?php
	require_once('libs/dbconnect.php');
	require_once('libs/common_functions.php');

	$start_date = mysqli_real_escape_string($conn, $_GET['start_date']);
	$dateStart = convertStringToDate($start_date);

	$end_date = mysqli_real_escape_string($conn, $_GET['end_date']);
	$dateEnd = convertStringToDate($end_date);

	$sqlQuery = " SELECT service_type_name, SUM(total) AS total_sales FROM vw_workout_type_sales ";
	if('null' != $dateStart && 'null' != $dateEnd)
		$sqlQuery .= " WHERE workout_date between $dateStart and $dateEnd";
	else
		$sqlQuery .= " WHERE workout_date BETWEEN date(SUBDATE(NOW(), WEEKDAY(NOW()))) and DATE(NOW() + INTERVAL (6 - WEEKDAY(NOW())) DAY) ";
	$sqlQuery .= " GROUP BY service_type_name ";

	//echo $sqlQuery;

	$recordCount = mysqli_num_rows(mysqli_query($conn, $sqlQuery));
	if(0 < $recordCount){
		$result = mysqli_query($conn, $sqlQuery) or die("Query fail: " . $sqlQuery);
		include('pages/workoutWeeklySalesList.html');	
	}

	exit(0);
?>