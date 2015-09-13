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

	//echo $sqlQuery;

	if(0 < $recordCount){
		$result = mysqli_query($conn, $sqlQuery) or die("Query fail: " . $sqlQuery);
		include('pages/attendanceList.html');	
	}

	exit(0);
?>