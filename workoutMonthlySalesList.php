<?php
	require_once('libs/dbconnect.php');
	require_once('libs/common_functions.php');

	$start_date = mysqli_real_escape_string($conn, $_GET['start_date']);
	$dateStart = convertStringToDate($start_date);

	$end_date = mysqli_real_escape_string($conn, $_GET['end_date']);
	$dateEnd = convertStringToDate($end_date);

	$sqlQuery = " SELECT service_type_name, SUM(total) AS total_sales  FROM vw_workout_type_sales  ";
	if('null' != $dateStart && 'null' != $dateEnd)
		$sqlQuery .= " WHERE workout_date between $dateStart and $dateEnd";
	else
		$sqlQuery .= " WHERE workout_date BETWEEN CAST(DATE_FORMAT(NOW() ,'%Y-%m-01') AS DATE) and LAST_DAY(NOW()) ";
	$sqlQuery .= " GROUP BY service_type_name ";

	//echo $sqlQuery;

	$recordCount = mysqli_num_rows(mysqli_query($conn, $sqlQuery));
	if(0 < $recordCount){
		$result = mysqli_query($conn, $sqlQuery) or die("Query fail: " . $sqlQuery);
		include('pages/workoutMonthlySalesList.html');	
	}

	exit(0);
?>