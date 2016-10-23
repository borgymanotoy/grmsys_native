<?php
	require_once('libs/dbconnect.php');
	require_once('libs/common_functions.php');

	//$log_date = mysqli_real_escape_string($conn, $_GET['log_date']);
	$strStartDate = mysqli_real_escape_string($conn, $_GET['startDate']);
	$strEndDate = mysqli_real_escape_string($conn, $_GET['endDate']);
	//$dateLog = convertStringToDate($log_date);

	$sqlQuery = " SELECT A.* FROM vw_workout_sales A";
	if( !empty($strStartDate) && !empty($strEndDate) ){
		$sqlQuery .= " WHERE A.workout_date BETWEEN STR_TO_DATE('" . $strStartDate . "', '%m-%d-%Y') AND STR_TO_DATE('" . $strEndDate . "', '%m-%d-%Y')";
	}

	$recordCount = mysqli_num_rows(mysqli_query($conn, $sqlQuery));


	if(0 < $recordCount){
		$result = mysqli_query($conn, $sqlQuery) or die("Query fail: " . $sqlQuery);
		include('pages/attendanceList.html');
	}

	exit(0);
?>